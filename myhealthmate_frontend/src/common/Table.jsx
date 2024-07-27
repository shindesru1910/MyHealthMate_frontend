import React from 'react';

function toCamelCase(str) {
    return str
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default function Table(props) {
    const { column, data_access, data, setflag, setmodalshow, seteditdata, handledelete, title } = props;

    const handleEdit = (datum) => {
        setflag("edit");
        setmodalshow(true);
        seteditdata(datum);
        localStorage.setItem("editDoctorData", JSON.stringify(datum));
        localStorage.setItem("editUserData", JSON.stringify(datum));
    };

    return (
        <div className="container">
            <h1>{title}</h1>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">No.</th>
                            {column.map((col, index) => (
                                <th scope="col" key={index}>{toCamelCase(col.key)}</th>
                            ))}
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((datum, index) => (
                            <tr key={datum.id}>
                                <th scope="row">{index + 1}</th>
                                {data_access.map((datum_access, i) => (
                                    <td key={i}>
                                        {datum_access === 'is_admin' ? (datum?.[datum_access] ? 'Yes' : 'No') : datum?.[datum_access]}
                                    </td>
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
    );
}
