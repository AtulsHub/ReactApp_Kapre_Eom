import React,{useState, useEffect} from 'react'



const ImageSlider = ({category,sNum,className,props}) => {
    const [index, setIndex] = useState(sNum);

    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prev) => (prev % 4)+1);
        }, 4000);
    
        return () => clearInterval(interval);
      }, []);
    
  return (
    <img src={`./${category}${index}.png`} alt="" className={` object-contain ${className}`} props={props} />
  )
}

export default ImageSlider