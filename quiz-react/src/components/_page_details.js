import React, { useEffect } from 'react'

const PageDetails = (props) => {
    useEffect(() => {
        // alert('Please add your page details here.')
        document.title = props.title;

        // get meta description tag and change it to the meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        metaDescription.setAttribute("content", props.description);

    }, [])
  return (
    <></>
  )
}

export default PageDetails