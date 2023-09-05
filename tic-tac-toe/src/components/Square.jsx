/* eslint-disable react/prop-types */
//Se pone en mayuscual porque es un componente
export const Square =({children,isSelected, updateBoard, index})=>{
    const className = `square ${isSelected ? 'is-selected':''}`
  
    const handleClick = ()=>{
      updateBoard(index)
    }
    
    return(
     <div onClick={handleClick} className={className}>
      {children}
     </div>
    )
  }