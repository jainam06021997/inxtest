'use client'
import React from "react";
import styles from '@/styles/JavaScript.module.css';
import apiService from "@/utils/apiService";

type SORTORDER = 'asc' | 'desc';

const Table: React.FC = () => {
    const [data, setData] = React.useState<any[]>([]);
    const [allData, setAllData] = React.useState<any[]>([]);
    const [searchValue, setSearchValue] = React.useState<string>('');

    const _getData = React.useCallback(async () => {
        try {
            const url = `https://api.irail.be/stations/?lang=en&format=json`;
            const res: any = await apiService.get(url);
            setData(res.station ?? []);
            setAllData(res.station ?? []);
        } catch (err) {
            console.log(err)
        }
    }, []);

    React.useEffect(() => {
        _getData();
    }, [_getData]);

    const _handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let _data = [...data];
        _data[index].note = event.target.value;
        setData([..._data]);
    };

    const _handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        let _data = [...allData];
        if (value !== '') {
            _data = _data.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));   
        }
        setData([..._data]);
    };

    const _handleSort = (field: string, sortOrder: SORTORDER) => {
        let _data = [...data];
        if (sortOrder === 'asc') {
            _data = _data.sort((a, b) => {
                if (a[field] < b[field]) return -1;
                if (a[field] > b[field]) return 1;
                return 0;
            });
        } else {
            _data = _data.sort((a, b) => {
                if (a[field] < b[field]) return 1;
                if (a[field] > b[field]) return -1;
                return 0;
            });
        }
        setData([..._data]);
    };

    return (
        <div className={styles.container}>
            <div>
                <input type="search" placeholder="Search by name" value={searchValue} onChange={(e) => _handleSearch(e)} />
            </div>
            <br />
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>
                            Name
                            <div className={styles['arrow-container']}>
                                <span onClick={() => _handleSort('name', 'asc')} className={`${styles['arrow']} ${styles['up-arrow']}`}></span>
                                <span onClick={() => _handleSort('name', 'desc')} className={`${styles['arrow']} ${styles['down-arrow']}`}></span>
                            </div>
                        </td>
                        <td>
                            Latitude
                            <div className={styles['arrow-container']}>
                                <span onClick={() => _handleSort('locationX', 'asc')} className={`${styles['arrow']} ${styles['up-arrow']}`}></span>
                                <span onClick={() => _handleSort('locationX', 'desc')} className={`${styles['arrow']} ${styles['down-arrow']}`}></span>
                            </div>
                        </td>
                        <td>
                            Longitude
                            <div className={styles['arrow-container']}>
                                <span onClick={() => _handleSort('locationY', 'asc')} className={`${styles['arrow']} ${styles['up-arrow']}`}></span>
                                <span onClick={() => _handleSort('locationY', 'desc')} className={`${styles['arrow']} ${styles['down-arrow']}`}></span>
                            </div>
                        </td>
                        <td>Note</td>
                    </tr>
                </thead>
                <tbody>
                    {data.length ? data.map((station, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <a href={`https://maps.google.com/?q=${station.locationX},${station.locationY}`} target="__blank">
                                        {station.name}
                                    </a>
                                </td>
                                <td>{station.locationX}</td>
                                <td>{station.locationY}</td>
                                <td>
                                    <input type="text" placeholder="Add a Note" value={station.note ?? ""} onChange={(e) => _handleChange(e, i)} />
                                </td>
                            </tr>
                        );
                    }): (
                        <tr>
                            <td colSpan={4}>No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;