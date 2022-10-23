import React, { useState } from 'react'
import MovieDataService from "../services/movies"
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddReview = ({user}) => {
    const navigate = useNavigate();
    let params = useParams();
    let initialReviewState = ""
    let editing = false; 
  
    const [review, setReview] = useState(initialReviewState)
    const onChangeReview = e => {
        const review = e.target.value
        setReview(review);
      } 
     
      const saveReview = () => {
        var data = {
          review: review,
          name: user.name,
          user_id: user.googleId,
          movie_id: params.id 
        }
    
        if(editing){
            data.review_id = props.location.state.currentReview._id
            MovieDataService.updateReview(data)
              .then(response =>{
                setSubmitted(true);
                navigate("/movies/" + params.id)
              })
              .catch(e =>{
                console.log(e);
              })
          }
          else{
            MovieDataService.createReview(data)
              .then(response => {
                navigate("/movies/" + params.id)
              })
              .catch(e =>{
                console.log(e);
              })    
          }
      }

      return(
          <Container className='main-container'>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
                <Form.Control
                  as="textarea" 
                  type="text" 
                  required
                  value={review} 
                  onChange={onChangeReview}
                  defaultValue={editing ? null : ""}
                />
              </Form.Group> 
              <Button variant="primary" onClick={saveReview}>
                Submit
              </Button>
            </Form>    
            </Container>
      )
}
export default AddReview;