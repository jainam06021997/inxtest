// import React from "react";
// import styles from '@/styles/JavaScript.module.css';
// import apiService from "@/utils/apiService";

import dynamic from "next/dynamic";

// const JavaScript: React.FC = () => {
//     const [data, setData] = React.useState<any[]>([]);

//     const _getData = React.useCallback(async () => {
//         try {
//             const url = `https://api.irail.be/stations/?lang=en&format=json`;
//             const res: any = await apiService.get(url);
//             setData(res?.station ?? []);
//         } catch (err) {

//         }
//     }, []);

//     React.useEffect(() => {
//         _getData();
//     }, [_getData]);
//     return (
//         <div className={styles.container}>
//             <table className={styles.table}>
//                 <thead>
//                     <tr>
//                         <td>Name</td>
//                         <td>Latitude</td>
//                         <td>Longitude</td>
//                         <td>Note</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.length ? data.map((station, i) => {
//                         return (
//                             <tr key={i}>
//                                 <td>{station.name}</td>
//                                 <td>{station.locationX}</td>
//                                 <td>{station.locationY}</td>
//                                 <td>
//                                     <input type="text" placeholder="Add a Note" value="" />
//                                 </td>
//                             </tr>
//                         )
//                     }): (
//                         <div>No records found</div>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

const JavaScript = dynamic(() => import('./Table'), { ssr: false });

export default JavaScript;
