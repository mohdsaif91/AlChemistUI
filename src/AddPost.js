import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

const initialData = {
  id: null,
  createdBy: "",
  postImage: "",
  comments: [],
  postInfo: { like: 0, celeberated: 0, supported: 0, loved: 0 },
  description: "",
};

function AddPost(props) {
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({ ...initialData });

  const sendData = () => {
    if (modalData.id) {
      props.addPostmethod(modalData, true);
    } else {
      modalData.id = uuidv4();
      props.addPostmethod(modalData, false);
    }
    setModalData({ ...initialData });
    setModal(false);
  };

  useEffect(() => {
    if (props.editData) {
      setModal(true);
      setModalData({ ...props.editData });
    }
  }, [props.editData]);

  return (
    <div className="add-post-container">
      <button className="add-post-btn" onClick={() => setModal(true)}>
        Add Post
      </button>
      <div className="modal-container">
        {modal && (
          <div className="modal fade" id="myModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">
                    {props.editData ? "Edit" : "Add"} Post
                  </h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                    onClick={() => setModal(false)}
                  >
                    ×
                  </button>
                </div>

                <div className="modal-body">
                  <form role="form">
                    <div className="form-group">
                      <label className="control-label">
                        Created By <span className="required-field">*</span>
                      </label>
                      <div className="has-feedback">
                        <input
                          type="text"
                          name="createdBy"
                          value={modalData.createdBy}
                          className="form-control"
                          onChange={(e) =>
                            setModalData({
                              ...modalData,
                              createdBy: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">
                        Description <span className="required-field">*</span>
                      </label>
                      <div className="has-feedback">
                        <textarea
                          type="text"
                          name="description"
                          value={modalData.description}
                          className="form-control"
                          onChange={(e) =>
                            setModalData({
                              ...modalData,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label">
                        Post Image <span className="required-field">*</span>
                      </label>
                      <div className="has-feedback">
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) =>
                            setModalData({
                              ...modalData,
                              postImage: URL.createObjectURL(e.target.files[0]),
                            })
                          }
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    className="form-control btn addpost-btn"
                    onClick={() => sendData()}
                  >
                    {props.editData ? "Edit" : "Add"} Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddPost;
