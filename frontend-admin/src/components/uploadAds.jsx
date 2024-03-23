import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import updatedImages from "./uploadImage";

const UploadAds = ({
  imgClass,
  containerClass,
  uploadBtn,
  setImg,
  url,
  product,
  dimension,
  dropClass,
  containerSubClass,
  ...props
}) => {
  const ImagePreview = ({ images, onUpdate, onDelete, imgClass, ...props }) => {
    const actionsRef = useRef([]);
    const [imgUrl, setImgUrl] = useState("");
    const handleChange = (e) => {
      setImgUrl(e);
    };

    // const handleImageChange = (index, e) => {
    //   const newImage = e.target.files[0];
    //   onUpdate(index, newImage);
    // };

    // useEffect(() => {
    //   props.handleUrl(imgUrl);
    // }, [imgUrl]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          !actionsRef.current.some((ref) => ref && ref.contains(event.target))
        ) {
          setShowActions(Array(images.length).fill(false));
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [images.length]);

    const [showActions, setShowActions] = useState(
      Array(images.length).fill(false)
    );

    const toggleActions = (index) => {
      setShowActions((prevShowActions) => {
        const updatedShowActions = [...prevShowActions];
        updatedShowActions[index] = !updatedShowActions[index];
        return updatedShowActions;
      });
    };

    return (
      <>
        {images?.map((url, index) => (
          <div key={index} id={`${props.idTitle}-${index}`}>
            <div className="img-head">
              <h1 className="img-title">Image {index + 1}</h1>
              <button
                onClick={() => toggleActions(index)}
                ref={(ref) => (actionsRef.current[index] = ref)}
              >
                ...
              </button>
              <ul
                className={`actions ${
                  showActions[index] ? "show-div" : "hide-div"
                }`}
              >
                <li
                  onClick={() => {
                    url.image ? onDelete(index) : props.handlePrevDel(index);
                  }}
                >
                  Delete
                </li>
              </ul>
            </div>

            {url.image ? (
              <>
                <img
                  src={
                    // !isBlobURL(url.image)
                    `https://backend.sabjiland.com/uploads/${url.image}`
                    // : url
                  }
                  alt={`Image ${index + 1}`}
                  className={`ad-img ${imgClass}`}
                />
                <div className="url-container">
                  <span>Image URL: </span>{" "}
                  <a href={url.url} target="_blank">
                    <input
                      type="text"
                      value={url.url}
                      readOnly
                      className="url-text"
                    />
                  </a>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={props.handleUpload}>
                  <img
                    src={
                      // !isBlobURL(url.image)
                      url
                      // : url
                    }
                    alt={`Images ${index + 1}`}
                    className={`ad-img ${imgClass}`}
                  />
                  <div className="url-container">
                    <span>Images URL: </span>{" "}
                    <input
                      type="text"
                      name="url"
                      value={imgUrl}
                      onChange={(e) => handleChange(e.target.value)}
                      id={`imgUrl-${index}`}
                      className="url-text"
                    />
                  </div>
                  <div className="img-btn-container">
                    <button
                      onClick={() => props.handleUpload}
                      className={`uploadAds`}
                    >
                      Upload Images
                    </button>
                  </div>
                </form>
              </>
            )}
            {/* {showBtn ? (
              
            ) : (
              ""
            )} */}
          </div>
        ))}
      </>
    );
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const [showBtn, setShowBtn] = useState(false);

  const [isFile, setIsFile] = useState(false);
  const inputRef = useRef(null);
  console.log(previewImages);

  useEffect(() => {
    if (product) {
      console.log("sadfg");
      console.log(selectedImages);
      setImg(selectedImages);
    }
  }, [selectedImages]);

  const [refresh, setRefresh] = useState(false);
  const [data, setdata] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backend.sabjiland.com/api/v1/${url}`
      );
      setdata(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refresh]);
  console.log(data);

  useEffect(() => {
    console.log(data);
    if (data) {
      const images = data.flatMap((entry) => entry.image);
      const url = data.flatMap((entry) => entry.url);

      setPreviewImages(data);
      //   if ([0] instanceof File) {
      //     const previewURLs = ?.map((file) => URL.createObjectURL(file));
      //     setPreviewImages(previewURLs);
      //     setIsFile(true);
      //   } else {
      //     setIsFile(false);

      //     setPreviewImages([]);
      //   }
    }
    // else {
    //   setIsFile(true);
    // }
  }, [data]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewURLs = files.map((file) => URL.createObjectURL(file));

    setSelectedImages([...selectedImages, ...files]);
    setPreviewImages([...previewImages, ...previewURLs]);
    setShowBtn(true);
  };
  console.log(selectedImages);
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    setSelectedImages([...selectedImages, ...files]);

    const previewURLs = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previewURLs]);
  };

  const handleUpdate = (index, newImage) => {
    const updatedImages = [...selectedImages];
    const updatedPreviews = [...previewImages];

    updatedImages[index] = newImage;
    updatedPreviews[index] = URL.createObjectURL(newImage);

    setSelectedImages(updatedImages);
    setPreviewImages(updatedPreviews);
  };

  const handleDelete = (index) => {
    const updatedPreviews = [...previewImages];
    const updatedImages = data[index];
    console.log(updatedImages);
    axios
      .delete(
        `https://backend.sabjiland.com/api/v1/deleteAd/${updatedImages._id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));

    // updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setPreviewImages(updatedPreviews);
  };

  const handlePrevDel = (index) => {
    const updatedPreviews = [...previewImages];

    updatedPreviews.splice(index, 1);
    console.log(updatedImages);
    setSelectedImages([]);
    setPreviewImages(updatedPreviews);
  };

  const [imageUrl, setImageUrl] = useState("");
  const handleImageUrlChange = (e) => {
    setImageUrl(e);
    // setImageUrl(e.target.value);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const urlData = e.target.url.value;
      selectedImages.map((image) => {
        formData.append("image", image);
        formData.append("url", urlData);
      });

      await axios
        .post("https://backend.sabjiland.com/api/v1/postAd", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then(() => {
          setRefresh(!refresh);
        });

      // Clear selected images and preview
      setSelectedImages([]);
      console.log("Images uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload images:", error);
    }
  };

  // useEffect(() => {
  //   handleUpload()

  // }, [selectedImages])

  const toggleActions = () => {
    setShowActions(!showActions);
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };
  console.log(previewImages);
  return (
    <div className={`add-ad ${containerClass}`}>
      {previewImages.length > 0 && (
        <div className={`ad-image-container ${containerSubClass}`}>
          <ImagePreview
            images={previewImages}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            showActions={showActions}
            imgClass={imgClass}
            handleUpload={handleUpload}
            imageUrl={imageUrl}
            handleUrl={handleImageUrlChange}
            handlePrevDel={handlePrevDel}
          />
          {/* <button onClick={toggleActions}>
            {showActions ? "Hide Actions" : "Show Actions"}
          </button> */}
        </div>
      )}
      <div className={`drop-img ${dropClass}`}>
        <input
          type="file"
          onChange={handleImageChange}
          className="input-f"
          id="input-file-upload"
          ref={inputRef}
        />

        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={`drag-active`}
        >
          <div
            className="upload"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <h3>Drag and drop files here</h3>
            <p>Files supported: Png, Jpg, Pdf </p>
            <button className="upload-button" onClick={onButtonClick}>
              Choose file
            </button>
            <p>Maximum size: 500Kb, Dimension: {dimension} px</p>
          </div>
        </label>
      </div>

      {/* {selectedImages.length > 0 && uploadBtn ? (
        <button onClick={handleUpload} className="uploadAds">Upload Images</button>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default UploadAds;
