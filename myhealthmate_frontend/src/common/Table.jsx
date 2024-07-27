import React from 'react';

export default function Table(props) {
    const { column, data_access, data, setflag, setmodalshow, seteditdata, handledelete, title } = props;

    const handleEdit = (datum) => {
        setflag("edit");
        setmodalshow(true);
        seteditdata(datum);
        localStorage.setItem("editDoctorData", JSON.stringify(datum));
    };

    return (
        <>
            <div className="container">
                <h1>{title}</h1>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">No.</th>
                                {column.map((col, index) => <th scope="col" key={index}>{col.lable}</th>)}
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((datum, index) => (
                                <tr key={datum.id}>
                                    <th scope="row">{index + 1}</th>
                                    {data_access.map((datum_access) => (
                                        datum_access === 'is_admin' ? (datum?.[datum_access] ? <td key={datum_access}>Yes</td> : <td key={datum_access}>No</td>) : <td key={datum_access}>{datum?.[datum_access]}</td>
                                    ))}
                                    <td>
                                        <i className="bi bi-pencil-square me-4" onClick={() => handleEdit(datum)} style={{ cursor: "pointer", color: 'blue' }}></i>
                                        <i className="bi bi-trash" onClick={() => handledelete(datum)} style={{ cursor: "pointer", color: "red" }}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
