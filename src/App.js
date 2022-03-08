import React, { useEffect, useRef, useState } from "react";

import "./App.css";

import Dog from "./Images/dog.jpeg";
import Street from "./Images/streetImage.jpg";
import Like from "./Images/like.png";
import Comment from "./Images/comment.png";
import ThreeDot from "./Images/h3dot.png";
import LinkedInLike from "./Images/linkedinLike.png";
import LinkedInClap from "./Images/linkedinClap.png";
import LinkedInSupport from "./Images/linkedinSupport.png";
import LinkedInLove from "./Images/linkedinLove.png";
import AddPost from "./AddPost";

const initialvisibilityData = {
  comment: "",
  elipisisMenu: false,
  elipsisIndex: "",
};

const dummyData = [
  {
    id: 1,
    createdBy: "Jeet Khandelwal",
    postImage: Dog,
    comments: [],
    postInfo: { like: 0, celeberated: 0, supported: 0, loved: 0 },
    description: "My Dogs, My Life.",
  },
  {
    id: 2,
    createdBy: "Darshan Sawant",
    postImage: Street,
    comments: [],
    postInfo: { like: 0, celeberated: 0, supported: 0, loved: 0 },
    description: "Empty Street makes the day.",
  },
];

function App() {
  const [visible, setVisible] = useState({ ...initialvisibilityData });
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("postData") || dummyData)
  );
  const [edit, setEdit] = useState(null);

  const inputRef = useRef();

  useEffect(() => {
    sessionStorage.setItem("postData", JSON.stringify(data));
  }, [data]);

  const commentAction = (str) => {
    setVisible({ ...visible, comment: str });
  };

  const openMenu = (i) => {
    setVisible({
      ...visible,
      elipsisIndex: i,
    });
  };

  const submitComment = (i) => {
    const newComment = [...data[i].comments, inputRef.current.value];
    data[i].comments = newComment;
    setData([...data]);
    inputRef.current.value = "";
  };

  const addReaction = (type, index) => {
    const indexData = data[index];
    let savingData = null;
    switch (true) {
      case type === "like":
        savingData = {
          ...indexData.postInfo,
          like: indexData.postInfo.like + 1,
        };
        break;
      case type === "celeberated":
        savingData = {
          ...indexData.postInfo,
          celeberated: indexData.postInfo.celeberated + 1,
        };
        break;
      case type === "support":
        savingData = {
          ...indexData.postInfo,
          supported: indexData.postInfo.supported + 1,
        };
        break;
      case type === "love":
        savingData = {
          ...indexData.postInfo,
          loved: indexData.postInfo.loved + 1,
        };
        break;
      default:
        return "";
    }
    data[index].postInfo = savingData;
    setData([...data]);
  };

  const addPostmethod = (datas, editFlag) => {
    if (editFlag) {
      const updatedList = data.map((m) => {
        if (m.id === datas.id) {
          return datas;
        } else {
          return m;
        }
      });
      setData([...updatedList]);
    } else {
      setData([...data, datas]);
    }
  };

  const editPost = (index) => {
    window.scrollTo(0, 0);
    setEdit({ ...data[index] });
    setVisible({ ...initialvisibilityData });
  };

  const deletePost = (index) => {
    setData(data.filter((f, i) => i !== index));
  };

  return (
    <div className="App">
      <AddPost
        editData={edit}
        addPostmethod={(data, flag) => addPostmethod(data, flag)}
      />

      {data.map((m, i) => (
        <div className="card" key={i}>
          <div className="CreatedBy">By {m.createdBy}</div>
          <img alt="" src={m.postImage} className="card-img" />
          <div className="post-comment">
            <div className="comment-heading">Description</div>
            <div className="comment">{m.description}</div>
          </div>
          <div className="post-info">
            <div className="like">
              {m.postInfo.like}
              <span className="text">Like</span>
            </div>
            <div className="celebrated">
              {m.postInfo.celeberated}
              <span className="text">celebrated</span>
            </div>
            <div className="supported">
              {m.postInfo.supported}
              <span className="text">Supported</span>
            </div>
            <div className="love">
              {m.postInfo.loved}
              <span className="text">Loved</span>
            </div>
          </div>
          {visible.elipsisIndex === i}
          {visible.elipsisIndex === i && (
            <div class="more-menu">
              <div class="more-menu-caret">
                <div class="more-menu-caret-outer"></div>
                <div class="more-menu-caret-inner"></div>
              </div>
              <ul
                class="more-menu-items"
                tabindex="-1"
                role="menu"
                aria-labelledby="more-btn"
                aria-hidden="true"
              >
                <li class="more-menu-item" role="presentation">
                  <button
                    onClick={() => editPost(i)}
                    type="button"
                    class="more-menu-btn"
                    role="menuitem"
                  >
                    Edit
                  </button>
                </li>
                <li class="more-menu-item" role="presentation">
                  <button
                    onClick={() => deletePost(i)}
                    type="button"
                    class="more-menu-btn"
                    role="menuitem"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className="post-action">
            <div className="like-comment-container">
              <div className="box">
                <input type="checkbox" id="like" className="field-reactions" />
                <img
                  alt=""
                  src={Like}
                  className="action-icon label-reactions"
                />
                <div className="toolbox"></div>
                <label className="overlay" htmlFor="like"></label>
                {/* <div className="btn-reactction-container"> */}
                <button
                  className="reaction-like"
                  onClick={() => addReaction("like", i)}
                >
                  <img alt="" src={LinkedInLike} className="action-icon" />
                  <span className="legend-reaction">Like</span>
                </button>
                <button
                  className="reaction-love"
                  onClick={() => addReaction("celeberated", i)}
                >
                  <img alt="" src={LinkedInClap} className="action-icon" />
                  <span className="legend-reaction">Clap</span>
                </button>
                <button
                  className="reaction-haha"
                  onClick={() => addReaction("support", i)}
                >
                  <img alt="" src={LinkedInSupport} className="action-icon" />
                  <span className="legend-reaction">Support</span>
                </button>
                <button
                  className="reaction-wow"
                  onClick={() => addReaction("love", i)}
                >
                  <img alt="" src={LinkedInLove} className="action-icon" />
                  <span className="legend-reaction">Love</span>
                </button>
                {/* </div> */}
              </div>
              <img
                alt=""
                src={Comment}
                onClick={() => commentAction(i)}
                className="action-icon comment-icon"
              />
            </div>

            <div>
              <img
                alt=""
                onClick={() => openMenu(i)}
                src={ThreeDot}
                className="action-icon"
              />
            </div>
          </div>
          {m.comments.length !== 0 && (
            <div className="comment-display-container">
              <div className="comment-count">
                All comment ({m.comments.length})
              </div>
              <div className="comment-display">
                {m.comments.map((m, commentIndex) => (
                  <div className="actual-comment" key={commentIndex}>
                    <div className="commented-person">By Alok Shenoy:</div>
                    <span className="c-text">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {visible.comment === i && (
            <div className="comment-container">
              <input
                type="text"
                placeholder="Write your comment here...."
                className="comment-text"
                ref={inputRef}
              />
              <button className="submit-btn" onClick={() => submitComment(i)}>
                Submit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
