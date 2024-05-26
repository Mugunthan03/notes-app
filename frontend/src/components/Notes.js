import React, { useState } from 'react';
import { MdOutlinePushPin, MdCreate, MdDeleteOutline } from "react-icons/md";

const Notes = ({
    id,
    title,
    content,
    date,
    isPinned,
    onEdit,
    onDelete,
}) => {
  const [pinned, setPinned] = useState(isPinned);

  const handlePinClick = () => {
    setPinned(!pinned);
  };

  // Function to format date as "date month year"
  const formatDate = (inputDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  };

  return (
    <div className='border-2  p-5 shadow-xl '>
      <div className=''>
        <div className='flex items-start justify-between '>
          <div>
            <h1 className='text-lg font-bold capitalize'>{title}</h1>
            <span className='text-sm font-medium text-gray-400'>{formatDate(date)}</span>
          </div>
          <div>
            <MdOutlinePushPin className={`text-xl ${pinned ? 'text-blue-600' : 'text-slate-300'}`} onClick={handlePinClick} />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <h1 className='capitalize'>{content}</h1>
          <div className='flex gap-6'>
            <MdCreate className='hover:text-orange-600 cursor-pointer text-2xl' onClick={() => onEdit(id)} />
            <MdDeleteOutline className='hover:text-red-500 cursor-pointer text-2xl' onClick={() => onDelete(id)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notes;
