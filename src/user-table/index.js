import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";

export function UserTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://jsonplaceholder.typicode.com/users',
      );
      console.log(result.data);
      setData(result);
    }
    fetchData();
  }, []);

  return(
    <div>
      
    </div>
  )
}
