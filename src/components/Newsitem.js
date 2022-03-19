import React from 'react'

const Newsitem = (props) => {
    let { title, description, imageUrl, publishedAt, newslink } = props;
    return (
        <div className='col-md-3'>
            <div className="card mb-3 mt-5">
                <div className="row g-0">
                    <div className="col-md-12">
                        <img src={imageUrl} className="img-fluid rounded-start" alt={title} />
                    </div>
                    <div className="col-md-12">
                        <div className="card-body">
                            <h6 className="card-title">{title}</h6>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-muted">{new Date(publishedAt).toGMTString()}</small></p>
                            <a target="_blank" rel="noreferrer" href={newslink} className='btn btn-sm btn-success'>Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export default Newsitem