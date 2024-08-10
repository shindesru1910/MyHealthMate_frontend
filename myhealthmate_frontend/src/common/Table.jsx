// // import React from 'react';

// // function toCamelCase(str) {
// //     return str
// //         .toLowerCase()
// //         .split('_')
// //         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
// //         .join(' ');
// // }

// // function getNestedValue(obj, path) {
// //     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
// // }

// // export default function Table(props) {
// //     const { column, data_access, data, setflag, setmodalshow, seteditdata, handledelete, title } = props;

// //     const handleEdit = (datum) => {
// //         setflag("edit");
// //         setmodalshow(true);
// //         seteditdata(datum);
// //         localStorage.setItem("editDoctorData", JSON.stringify(datum));
// //         localStorage.setItem("editUserData", JSON.stringify(datum));
// //     };

// //     return (
// //         <div className="container">
// //             <h1>{title}</h1>
// //             <div className="table-responsive">
// //                 <table className="table table-hover">
// //                     <thead className="table-dark">
// //                         <tr>
// //                             <th scope="col">No.</th>
// //                             {column.map((col, index) => (
// //                                 <th scope="col" key={index}>{toCamelCase(col.key)}</th>
// //                             ))}
// //                             <th scope="col">Actions</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {data.map((datum, index) => (
// //                             <tr key={datum.id}>
// //                                 <th scope="row">{index + 1}</th>
// //                                 {data_access.map((datum_access, i) => (
// //                                     <td key={i}>{getNestedValue(datum, datum_access)}</td>
// //                                 ))}
// //                                 <td>
// //                                     <i className="bi bi-pencil-square me-4" onClick={() => handleEdit(datum)} style={{ cursor: "pointer", color: 'blue' }}></i>
// //                                     <i className="bi bi-trash" onClick={() => handledelete(datum)} style={{ cursor: "pointer", color: "red" }}></i>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         </div>
// //     );
// // }

// import React from 'react';

// function toCamelCase(str) {
//     return str
//         .toLowerCase()
//         .split('_')
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(' ');
// }

// function getNestedValue(obj, path) {
//     return path.split('.').reduce((acc, part) => acc && acc[part], obj);
// }

// export default function Table(props) {
//     const { column, data_access, data, setflag, setmodalshow, seteditdata, handledelete, title } = props;

//     const handleEdit = (datum) => {
//         setflag("edit");
//         setmodalshow(true);
//         seteditdata(datum);
//         localStorage.setItem("editDoctorData", JSON.stringify(datum));
//         localStorage.setItem("editUserData", JSON.stringify(datum));
//     };

//     // Safeguard: Ensure `data` and `column` are arrays
//     const isDataArray = Array.isArray(data);
//     const isColumnArray = Array.isArray(column);

//     return (
//         <div className="container">
//             <h1>{title}</h1>
//             <div className="table-responsive">
//                 <table className="table table-hover">
//                     <thead className="table-dark">
//                         <tr>
//                             <th scope="col">No.</th>
//                             {isColumnArray && column.map((col, index) => (
//                                 <th scope="col" key={index}>{toCamelCase(col.key)}</th>
//                             ))}
//                             <th scope="col">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {isDataArray && data.length > 0 ? (
//                             data.map((datum, index) => (
//                                 <tr key={datum.id}>
//                                     <th scope="row">{index + 1}</th>
//                                     {data_access && data_access.map((datum_access, i) => (
//                                         <td key={i}>{getNestedValue(datum, datum_access) || 'N/A'}</td>
//                                     ))}
//                                     <td>
//                                         <i className="bi bi-pencil-square me-4" onClick={() => handleEdit(datum)} style={{ cursor: "pointer", color: 'blue' }}></i>
//                                         <i className="bi bi-trash" onClick={() => handledelete(datum)} style={{ cursor: "pointer", color: "red" }}></i>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan={isColumnArray ? column.length + 1 : 2}>No data available</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
import React from 'react';

function toCamelCase(str) {
    return str
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export default function Table(props) {
    const { column, data_access, data, setflag, setmodalshow, seteditdata, handledelete, title } = props;

    const handleEdit = (datum) => {
        console.log("Editing:", datum); // Debugging line
        setflag("edit");
        setmodalshow(true);
        seteditdata(datum);
        localStorage.setItem("editDoctorData", JSON.stringify(datum));
        localStorage.setItem("editUserData", JSON.stringify(datum));
    };

    const isDataArray = Array.isArray(data);
    const isColumnArray = Array.isArray(column);

    return (
        <div className="container">
            <h1>{title}</h1>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">No.</th>
                            {isColumnArray && column.map((col, index) => (
                                <th scope="col" key={index}>{toCamelCase(col.key)}</th>
                            ))}
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isDataArray && data.length > 0 ? (
                            data.map((datum, index) => (
                                <tr key={datum.id}>
                                    <th scope="row">{index + 1}</th>
                                    {data_access && data_access.map((datum_access, i) => (
                                        <td key={i}>{getNestedValue(datum, datum_access) || 'N/A'}</td>
                                    ))}
                                    <td>
                                        <i 
                                            className="bi bi-pencil-square me-4" 
                                            onClick={() => handleEdit(datum)} 
                                            style={{ cursor: "pointer", color: 'blue' }}
                                        ></i>
                                        <i 
                                            className="bi bi-trash" 
                                            onClick={() => handledelete(datum)} 
                                            style={{ cursor: "pointer", color: "red" }}
                                        ></i>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={isColumnArray ? column.length + 1 : 2}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
