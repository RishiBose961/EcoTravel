import React from 'react'

const EcoList = () => {
    const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div> <div>
    {" "}
    <p className="text-2xl font-bold mt-2">Eco Friendly Hotel</p>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
      {data.map((item) => (
        <div className="card w-full bg-base-100 shadow-xl ring-1 ring-white">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="m-2">
            <h2 className="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div></div>
  )
}

export default EcoList