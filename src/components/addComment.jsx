import React, { Component } from "react";
import imageIcon from "../assets/image.png";
import videoIcon from "../assets/video.png";
import $ from "jquery";

export default class addComment extends Component {
  constructor() {
    super();
    this.state = { imgURL: null };
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
  };
  render() {
    return (
      <>
        <div className="uploadForm">
          <div className="uploadForm__header">
            <div className="uploadForm__header--label">Create a Post</div>
            <div className="uploadForm__header--close">&#10006;</div>
          </div>

          <form className="uploadForm__form">
            <div className="uploadForm__form--container">
              <input
                className="uploadForm__form--container--comment"
                type="text"
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
                <input id="img-input" type="file" name="imgInput" />
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
                <input id="video-input" type="file" name="videoInput" />
              </div>
            </div>
            <div className="uploadForm__form--preview">
              <img
                className="uploadForm__form--preview--img"
                alt="this is img preview"
              />
              <video className="uploadForm__form--preview--video" />
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
