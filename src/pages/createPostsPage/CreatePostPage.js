import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../store/PostsSlice'

function CreatePostPage() {
    const dispatch = useDispatch()
    const {message} = useSelector(state => state.postsReducer)
    const [form, setForm] = useState({})

    const changeForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(createPost(form))
    }
  return (
    <div>
      <form>
        <input type='text' name='title' onChange={changeForm}></input>
        <textarea cols="30" rows="10" name='body' onChange={changeForm}></textarea>
        <button type='submit' onClick={submit}>create post</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default CreatePostPage
