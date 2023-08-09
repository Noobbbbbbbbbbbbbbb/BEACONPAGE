
// import Link from "next/link";
// export async function getStaticProps() {
//   const res = await fetch("https://carmine-hatchling-tutu.cyclic.app/latest");
//   const data = await res.json();
//   console.log(data);
  
//   return {
//     props: {
//       profile: data.profile || {},
//     },
//   };
// }

// export default function Index({ profile }) 
// { 
//   return (
//     <>
//     <center><h1><b>WELLCOME TO DATA CENTER ROOM</b></h1></center>
//       <center><div>
//         <div key={profile.userId}>

//           <img src={profile.pictureUrl} alt="Profile Picture" style={{ width: "450px", height: "450px" }} />
//           <h2>สวัสดีคุณ : {profile.displayName}</h2>
//           <h2>สเตตัส : {profile.statusMessage}</h2>
//           {/* <h2>{profile.timestamp.toLocaleString()}</h2> */}
//         </div>
//       </div>
//       </center>
      
//     </>
//   );
// }

import { useEffect, useState } from "react";
import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch("https://carmine-hatchling-tutu.cyclic.app/latest");
  const data = await res.json();
  
  return {
    props: {
      profile: data.profile || {},
    },
    revalidate: 1, // เพื่อให้หน้าเว็บเรียก API ใหม่ทุก 60 วินาที
  };
}

export default function Index({ profile }) {
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  useEffect(() => {
    // สร้างฟังก์ชันเพื่อดึงข้อมูลจาก API ใหม่เมื่อมีการเปลี่ยนแปลง
    const fetchUpdatedData = async () => {
      const res = await fetch("https://carmine-hatchling-tutu.cyclic.app/latest");
      const data = await res.json();
      setUpdatedProfile(data.profile || {});
    };

    const intervalId = setInterval(() => {
      fetchUpdatedData();
    }, 1000); // สั่งให้ดึงข้อมูลใหม่ทุก 60 วินาที

    // ยกเลิก Interval เมื่อ Component ถูก unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <center>
        <h1>
          <b>WELCOME TO DATA CENTER ROOM</b>
        </h1>
      </center>
      <center>
        <div>
          <div key={updatedProfile.userId}>
            <img
              src={updatedProfile.pictureUrl}
              alt="Profile Picture"
              style={{ width: "426px", height: "642px" }}
            />
            <h2>สวัสดีคุณ : {updatedProfile.displayName}</h2>
            <h2>สเตตัส : {updatedProfile.statusMessage}</h2>
          </div>
        </div>
      </center>
    </>
  );
}



















