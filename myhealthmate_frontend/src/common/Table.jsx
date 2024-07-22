import React from 'react';

export default function Table(props) {
    const { column, data_access, data, setflag, setmodalshow, seteditdata, handledelete,title } = props;

    return (
        <>
            <div className="container">
                <h1>{title}</h1>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">No.</th>
                                {column.map((col,index) => <th scope="col" key={index}>{col.lable}</th>)}
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((datum, index) => (<tr key={datum.id}>
                                <th scope="row">{index + 1}</th>
                                {data_access.map((datum_access) => (
                                    datum_access === 'is_admin' ? (datum?.[datum_access] ? <td>Yes</td> : <td>No</td>) : <td>{datum?.[datum_access]}</td>   
                                
                                    // {(datum_access === 'is_admin' &&  datum?.[datum_access]) ? <td>Yes</td> : <td>No</td>}
                                ))}

                                <td><i className="bi bi-pencil-square me-4" onClick={() => { setflag("edit"); setmodalshow(true); seteditdata(true) ;  }} style={{ cursor: "pointer",color:'blue' }}></i><i className="bi bi-trash" onClick={() => handledelete(true)} style={{ cursor: "pointer",color:"red" }} ></i></td>
                            </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
