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



