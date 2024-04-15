from fastapi import FastAPI, BackgroundTasks, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import pandas as pd
import json
import uvicorn
import uuid
from bson import json_util
from typing import List
import requests
import numpy as np
import os
import time
# EDA
import pandas as pd
import numpy as np

# Data Preprocessing 
from sklearn import preprocessing

# Data visualisation
import matplotlib.pyplot as plt
import seaborn as sns
sns.set()

# Recommender System Imps
# Content Based Filtering 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
# Collaborative Based Filtering 
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

# To work with text data 
import re
import string


app = FastAPI()
origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def dataImport():
    df = pd.read_csv('data/foods.csv')
    df['Describe'] = df['Describe'].apply(text_cleaning)
    rating = pd.read_csv('data/ratings.csv')
    # Removing the last row which is null
    rating = rating[:511]
    food_rating = rating.groupby(by = 'Food_ID').count()
    food_rating = food_rating['Rating'].reset_index().rename(columns={'Rating':'Rating_count'})
    # The user rating dataframe shows the number of ratings given with respect to the user
    user_rating = rating.groupby(by='User_ID').count()
    user_rating = user_rating['Rating'].reset_index().rename(columns={'Rating':'Rating_count'})
    # Ultimate Table
    rating_matrix = rating.pivot_table(index='Food_ID',columns='User_ID',values='Rating').fillna(0)
    return rating_matrix,df


def recommendation_setup(rating_matrix):
    csr_rating_matrix =  csr_matrix(rating_matrix.values)
    recommender = NearestNeighbors(metric='cosine')
    recommender.fit(csr_rating_matrix)
    return recommender
    

def Get_Recommendations(recommender,df,rating_matrix,title):
    try:
        user= df[df['Name']==title]
        user_index = np.where(rating_matrix.index==int(user['Food_ID']))[0][0]
        user_ratings = rating_matrix.iloc[user_index]

        reshaped = user_ratings.values.reshape(1,-1)
        distances, indices = recommender.kneighbors(reshaped,n_neighbors=16)
        
        nearest_neighbors_indices = rating_matrix.iloc[indices[0]].index[1:]
        nearest_neighbors = pd.DataFrame({'Food_ID': nearest_neighbors_indices})
        
        result = pd.merge(nearest_neighbors,df,on='Food_ID',how='left')
        dta = json.loads('{"items":' + result.to_json(orient='records', date_format='iso') + '}')
        
        return dta
    except:
        return Get_Recommendations(recommender,df,rating_matrix,"tricolour salad")


# Function to remove all the punctuation from the "Describe" column
def text_cleaning(text):
    text  = "".join([char for char in text if char not in string.punctuation])    
    return text


rating_matrix,df =  dataImport()
recommender = recommendation_setup(rating_matrix)
# Get_Recommendations(recommender,df,rating_matrix,'tricolour salad')



@app.get("/rec/{food_name}")
def get_status_bulk_update(food_name: str):
    print(food_name)
    recommendations = Get_Recommendations(recommender,df,rating_matrix,food_name)
    # rec = json.dumps(recommendations)
    return recommendations

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, log_level="info")