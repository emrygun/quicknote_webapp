import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "../login/Login.jsx";
import { CreateNote, UserNote, DisplayNote } from "./note/Note";

import "./noteapp.scss";

export function Noteapp(props) {
    //LogedIn state
    const [logedIn, setLogedIn] = useState(true);

    //Note states for UI
    const [currentNote, setCurrentNote] = useState(null);
    const [userNotes, setUserNotes] = useState([]);
    const [userNotesUpdated, setUserNotesUpdated] = useState(false);
    const reloadNotes = () => setUserNotesUpdated(prev => !prev);

    const [inputToken, setInputToken] = useState(null);

    //Side component states
    const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
    const [showDisplayNoteModal, setShowDisplayNoteModal] = useState(false);


    //Open CreateNoteModal
    const switchCreateNoteModal = () => {
        setShowCreateNoteModal((prev) => !prev);
        setShowDisplayNoteModal(false);
        setCurrentNote(null);
        //reload note list
        reloadNotes();
    };

    //Open DisplayNoteModal
    const switchDisplayNoteModal = (tempNote) => {
        console.log(tempNote)
        if (tempNote == null){
            setShowDisplayNoteModal(false);
            setCurrentNote(null);
        }
        else {
            if (currentNote != null) {
                setCurrentNote(tempNote);
            }
            else {
                setCurrentNote(tempNote)
                setShowDisplayNoteModal((prev) => !prev);
                setShowCreateNoteModal(false);
            }
        }
    };

    const deleteUserNote = (Note) => {
        fetch('http://localhost:5000/deleteNote', 
        {
            method: 'post',
            headers: 
            {
                'Content-Type':'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(
            {
                googleId: props.googleProfile.googleId,
                token: Note.noteId
            })
        })
        .then(res => { return res.json(); })  
        .then(reloadNotes())
    }

    const getNoteWithToken = (token) => {
        return fetch('http://localhost:5000/getNote', 
        {
            method: 'post',
            headers: 
            {
                'Content-Type':'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(
            {
                googleId: props.googleProfile.googleId,
                token: token
            })
        })
        .then(res =>{ return res.json() })  
        .then(data =>{ 
            console.log(data);
            switchDisplayNoteModal(data);
            }
        )
    }

    useEffect (() => {
        //Get updated user notes
        fetch('http://localhost:5000/getNote', 
        {
            method: 'post',
            headers: 
            {
                'Content-Type':'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(
            {
                googleId: props.googleProfile.googleId,
                token: 0
            })
        })
        .then(res => { return res.json(); })  
        .then(data => { 
            console.log(data);
            setUserNotes(data);
        })
        console.log(userNotes);

    }, [userNotesUpdated]);

  return (
    <Switch>
      <Route exact path="/">
        {1 ? (
          <div className="component-main-container">
            <div className="app-container column ">
              <div className="app-container box column is-three-fifths">
                <div className="app-navbar navbar">
                  <div className="navbar-start">
                    <div className="navbar-brand navbarTitle">
                      <p className="title is-3">QuickNote</p>
                    </div>
                  </div>
                  <div className="navbar-end">
                    <div className="profile-container">
                      <div className="google-user-profile">
                        <p className="subtitle is-5 google-user-profileName">
                          {props.googleProfile.name}
                        </p>
                      </div>
                      <img
                        className="image is-24x24"
                        src={props.googleProfile.imageUrl}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="app-note-container">
                  <div className="app-note-header">
                    <p className="note-counter button is-small">
                      {userNotes.length} notes found.
                    </p>
                    <div className="search-token field has-addons">
                      <button
                        className="button is-small note-create-button"
                        onClick={switchCreateNoteModal}
                      >
                        Create Note
                      </button>
                      <div className="control">
                        <input
                          className="input is-small"
                          type="text"
                          placeholder="Get note with Token"
                          onChange={(event) => setInputToken(event.target.value)}
                        />
                      </div>
                      <div className="control">
                        <button
                          className="button is-small"
                          onClick={() => {getNoteWithToken(parseInt((inputToken)))}}
                        >
                          Get Note
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="app-note-main">
                    <div className="app-note-context column">
                      <div className="app-note-tags column is-two-fifths">
                        <ul>
                            {userNotes.map(elem => <UserNote 
                                Note={elem}
                                deleteUserNote={deleteUserNote}
                                switchDisplayNoteModal={switchDisplayNoteModal}
                                showDisplayNoteModal={showDisplayNoteModal}
                            />)} 
                        </ul>
                      </div>
                      <div className="app-note-edit column is-three-fifths">
                        <CreateNote
                          showCreateNoteModal={showCreateNoteModal}
                          switchCreateNoteModal={switchCreateNoteModal}
                          Profile={props.googleProfile}
                        />
                        <DisplayNote
                          showDisplayNoteModal={showDisplayNoteModal}
                          switchDisplayNoteModal={switchDisplayNoteModal}
                          reloadNotes={reloadNotes}
                          Profile={props.googleProfile}
                          Note={currentNote}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Login />
        )}
      </Route>
    </Switch>
  );
}
