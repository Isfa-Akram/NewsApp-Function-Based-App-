import React, {useState,useEffect } from 'react'
import NewsItems from './NewsItems'
import Spinning  from './Spinning'
import PropTypes from 'prop-types'



const News =(props)=> {

    const[articles,setArticles]= useState([]);
    const[loading,setLoading]= useState(false);
    const[pages,setPages]= useState(1);
    const[totalResults,setTotalResults]= useState(0);


   const capitalizeFirstLetter = (string) =>{
         return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    

   const UpdateNews =  async() =>
    {
        props.setProgress(10);

       
        let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=51c6cc40071f4239a2f171e1cada0e5a&page=${pages}&pageSize=${props.pageSize}`;

        
      //  let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey= 51c6cc40071f4239a2f171e1cada0e5a&page=${pages}&pageSize=${props.pageSize}`;
       

        setLoading(true);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData =  await data.json();
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
}

//square brackets is used to listen event. After this event your component did mount run. we use useEffect in the 
//place of component did mount component

useEffect(()=>{
   
    document.title= capitalizeFirstLetter(props.category);
    UpdateNews();
    
},[]);
   

   const nextPage= async ()=>
    {
        
        if(pages + 1 > Math.ceil(totalResults/props.pageSize))
        {}
        else{
          setPages(pages+1);
          UpdateNews();
        }
       
    }

   const previousPage= async ()=>
    {
    
    setPages(pages-1);
    UpdateNews();

    }


    
        return (
            <>
            <div className="container my-5">
                <h2 className= "text-center" style={{marginTop:'90px'}} >NewsApp - {capitalizeFirstLetter(props.category)} News</h2>
                {/*The above logic means if the state of loading is true then only display the spinner in the application otherwise not.*/}
                {loading && <Spinning/>}
                
                <div className="row">
                    {!loading && articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItems title={element.title ? element.title.slice(0,30) : " "} description={element.description ? element.description.slice(0,50) :" "} imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author?"Unknown": element.author} publishedAt={element.publishedAt}/>
                        </div>
                    })}
                </div>
            
                </div>
            <div className="container d-flex justify-content-between">
            <button disabled={pages <= 1} type="button" className="btn btn-secondary" onClick={previousPage}> &larr; Previous</button>
            <button disabled={pages + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-secondary" onClick={nextPage}>Next &rarr;</button>
            </div>

        </>

        )
    }

    News.defaultProps={
        country : 'us',
        pageSize: 9,
        category: 'science'

    }

    News.propTypes={
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string

    }

export default News
