import React, { Component } from "react";
import imageIcon from "../assets/image.png";
import videoIcon from "../assets/video.png";
import $ from "jquery";
import axios from "axios";

const BackendURL = "http://3.15.233.84:4000";
export default class addComment extends Component {
  constructor() {
    super();
    this.state = { imgURL: null, videoURL: null };
  }

  imageUploadClicked = (e) => {
    e.preventDefault();
    /*******************layout adjust*******************/
    console.log("Image uplaod clicked");
    var form = document.querySelector(".uploadForm__form");
    var container = document.querySelector(".uploadForm__form--container");
    var preview = document.querySelector(".uploadForm__form--preview");
    var videoPreview = document.querySelector(
      ".uploadForm__form--preview--video"
    );
    var imagePreview = document.querySelector(
      ".uploadForm__form--preview--img"
    );
    form.style.height = "90%";
    container.style.height = "50%";
    preview.style.display = "block";
    videoPreview.style.display = "none";
    imagePreview.style.display = "flex";

    /*******************upload handler********************/
    var input = document.querySelector("#img-input");

    input.addEventListener("change", (e) => {
      console.log(input.files[0]);
      let receivedInput = input.files[0];

      let reader = new FileReader();

      reader.addEventListener("load", () => {
        imagePreview.src = reader.result;
        console.log(reader.result);
        this.setState({ imgURL: reader.result });
      });

      if (receivedInput) {
        reader.readAsDataURL(receivedInput);
      }
    });
  };

  videoUploadClicked = (e) => {
    e.preventDefault();
    /*******************layout adjust*******************/
    console.log("video uplaod clicked");
    var form = document.querySelector(".uploadForm__form");
    var container = document.querySelector(".uploadForm__form--container");
    var preview = document.querySelector(".uploadForm__form--preview");
    var videoPreview = document.querySelector(
      ".uploadForm__form--preview--video"
    );
    var imagePreview = document.querySelector(
      ".uploadForm__form--preview--img"
    );
    form.style.height = "90%";
    container.style.height = "50%";
    preview.style.display = "block";
    videoPreview.style.display = "flex";
    imagePreview.style.display = "none";

    /*******************upload handler********************/

    var input = document.querySelector("#video-input");

    input.addEventListener("change", (e) => {
      console.log(input.files[0]);
      let receivedInput = input.files[0];

      let reader = new FileReader();

      reader.addEventListener("load", (e) => {
        videoPreview.src = reader.result;
        this.setState({ videoURL: reader.result });
      });

      if (receivedInput) {
        reader.readAsDataURL(receivedInput);
      }
    });
  };

  closeButtonHandler = () => {
    document.querySelector(".uploadForm").style.display = "none";
    document.querySelector(".uploadForm__form--preview").style.display = "none";
  };

  inputFieldFocusHandler = () => {
    document.querySelector(".uploadForm").style.display = "flex";
    document.querySelector(".uploadForm__form--container--comment").value = "";
    document.querySelector("#video-input").value = "";
    document.querySelector("#img-input").value = "";
  };

  formSubmitHandler = (e) => {
    e.preventDefault();
    let content = e.target.contentInput.value;
    let likes = 0;

    let input = {
      content: content,
      images: this.state.imgURL,
      videos: this.state.videoURL,
      likes: likes,
    };

    var postOption = {
      method: "POST",
      url: `${BackendURL}/post/add`,
      data: input,
      headers: {
        "auth-token": window.sessionStorage.getItem("curToken"),
      },
    };

    axios(postOption).then((response) => {
      console.log(response.data);
    });

    console.log(content);
  };

  render() {
    return (
      <>
        <div className="uploadForm">
          <div className="uploadForm__header">
            <div className="uploadForm__header--label">Create a Post</div>
            <div
              className="uploadForm__header--close"
              onClick={this.closeButtonHandler}
            >
              &#10006;
            </div>
          </div>

          <form
            className="uploadForm__form"
            onSubmit={(e) => {
              this.formSubmitHandler(e);
            }}
          >
            <div className="uploadForm__form--container">
              <textarea
                className="uploadForm__form--container--comment"
                type="text"
                name="contentInput"
                placeholder=" Enter your comment here"
              />
              <div className="uploadForm__form--container--upload">
                <button
                  className="uploadForm__form--container--upload--image--button"
                  onClick={(e) => {
                    this.imageUploadClicked(e);
                    $("#img-input").trigger("click");
                  }}
                >
                  <img
                    className="uploadForm__form--container--upload--image--button--icon"
                    alt="this is img upload icon"
                    src={imageIcon}
                  ></img>
                </button>
                <input
                  id="img-input"
                  type="file"
                  name="imgInput"
                  accept="image/*"
                />
                <button
                  className="uploadForm__form--container--upload--video--button"
                  onClick={(e) => {
                    this.videoUploadClicked(e);
                    $("#video-input").trigger("click");
                  }}
                >
                  <img
                    className="uploadForm__form--container--upload--video--button--icon"
                    alt="this is video upload icon"
                    src={videoIcon}
                  ></img>
                </button>
                <input
                  id="video-input"
                  type="file"
                  name="videoInput"
                  accept="video/*"
                />
              </div>
            </div>
            <div className="uploadForm__form--preview">
              <img
                className="uploadForm__form--preview--img"
                alt="this is img preview"
              />
              <video
                className="uploadForm__form--preview--video"
                autoPlay
                controls
              >
                Your Browser does not support this kind of video to play
              </video>
            </div>
            <div className="uploadForm__form--submit">
              <input
                type="submit"
                className="uploadForm__form--submit--button"
                value="POST"
              />
            </div>
          </form>
        </div>
        <div className="addComment">
          <form className="addComment__form">
            <div className="addComment__form--container">
              <input
                className="addComment__form--container--comment"
                type="text"
                placeholder=" Enter your comment here"
                onFocus={this.inputFieldFocusHandler}
              />
              <div className="addComment__form--container--upload">
                <img
                  className="addComment__form--container--upload--image"
                  alt="this is img upload icon"
                  src={imageIcon}
                  onClick={() => {
                    console.log("image upload clicked");
                  }}
                ></img>
                <img
                  className="addComment__form--container--upload--video"
                  alt="this is video upload icon"
                  src={videoIcon}
                  onClick={() => {
                    console.log("Video upload clicked");
                  }}
                ></img>
              </div>
            </div>
            <div className="addComment__form--submit">
              <input
                type="submit"
                className="addComment__form--submit--button"
                value="POST"
              />
            </div>
          </form>
        </div>
      </>
    );
  }
}
