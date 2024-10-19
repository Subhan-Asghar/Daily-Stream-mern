import React, { useEffect, useState } from 'react'

const Home = () => {
    const [heading,setheading]=useState('Top headlines')
    const [data,setdata]=useState([])
    const [page, setPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    useEffect(()=>{
        const fetchnew=async()=>{
            try{
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=053fc17bc351406b810a2de5923d4709&page=${page}&pageSize=12`);
                const apidata=await response.json()
                console.log(apidata)
                setdata(apidata.articles)
                setTotalPages(Math.ceil(apidata.totalResults / 12));
            }
            catch(err){
                console.log("Error",err)
            }
        }
        fetchnew()

       
    },[page])
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    // Function to handle 'Back' button click
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }
  return (
    <>
    <nav className="bg-red-600 h-16 flex justify-between items-center px-6 shadow-lg">
    <h3 className="text-white font-bold text-lg">Daily Stream</h3>
    <div className="space-x-4">
        <button 
        onClick={()=>{setheading('Business Headlines')}}
        className="bg-white w-24 h-10 rounded-full text-red-600 font-semibold shadow hover:bg-gray-200 transition duration-300">
            Business
        </button>
        <button 
        onClick={()=>{setheading('Economy Headlines')}}
        className="bg-white w-24 h-10 rounded-full text-red-600 font-semibold shadow hover:bg-gray-200 transition duration-300">
            Economy
        </button>
        <button 
        onClick={()=>{setheading('Sport Headlines')}}
        className="bg-white w-24 h-10 rounded-full text-red-600 font-semibold shadow hover:bg-gray-200 transition duration-300">
            Sport
        </button>
        <button 
        onClick={()=>{setheading('Politics Headlines')}}
        className="bg-white w-24 h-10 rounded-full text-red-600 font-semibold shadow hover:bg-gray-200 transition duration-300">
            Politics
        </button>
    </div>
</nav>

<div className="text-center pt-6">
    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide transition-all duration-300">
        {heading}
    </h3>
    <div className="h-1 w-32 bg-red-600 mx-auto mt-2"></div> 
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {
        data.length > 0 ? (
            data.map((article) => (
                <div key={article.title} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                    <img src={article.urlToImage} alt="image" className="w-full h-40 object-cover" />
                    <div className="p-4 flex flex-col justify-between flex-grow">
                        <h3 className="text-lg font-bold text-gray-900 truncate">{article.title}</h3>
                        <p className="text-sm text-gray-600 my-2">
                            {article.description ? article.description.substring(0, 100) : 'No description available'}...
                        </p>
                        <h2 className="text-xs text-gray-500 mb-2">{new Date(article.publishedAt).toLocaleDateString()}</h2>
                        <div className="mt-auto">
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <button className="bg-red-600 w-full h-10 text-white font-semibold rounded-full hover:bg-red-700 transition duration-300">
                                    Read more
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-center mt-4">Loading articles...</p>
        )
    }
</div>



<div className="flex justify-center items-center space-x-4 py-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className={`bg-red-600 w-24 h-10 text-white font-semibold rounded-full ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'} transition duration-300`}>
                    Back
                </button>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className={`bg-red-600 w-24 h-10 text-white font-semibold rounded-full ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'} transition duration-300`}>
                    Next
                </button>
            </div>

    
    </>
    
  )
}

export default Home