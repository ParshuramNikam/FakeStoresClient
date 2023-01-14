import SideBar from '../components/SideBar'
import DocsIntro from '../components/DocsIntro'
import Footer from '../components/Footer'
import DocsContent from '../components/DocsContent'
import Nav from '../components/Nav'
import { useEffect, useState } from 'react'
import Cookies from "js-cookie";

const Docs = () => {
    const [userDetails, setUserDetails] = useState(null); // logged in user data
    const [token] = useState(Cookies.get("access_token"));

    const getUserDetails = async () => {
        await fetch('https://fakestores.onrender.com/api/auth/protected', {
            // credentials: "include",
            method: "POST",
            body: JSON.stringify({
                accessToken: Cookies.get('access_token')
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        }).then((res) => res.json())
            .then((result) => {
                if (result.status === 'success') {
                    setUserDetails(result.user)
                    console.warn(result.user);
                } else {
                    router.push("/user/login");
                }
            }).catch((err) => {
                console.log("Error in get User details :", err.message, err);
            })
    }

    useEffect(() => {
        if (token) {
            getUserDetails();
        }
    }, [token])

    return (
        <section>
            <div className="flex flex-wrap">
                <SideBar />
                <div className="w-full lg:w-4/5">
                    <Nav />
                    <div className="p-2 md:p-4">
                        <DocsIntro userDetails={userDetails} />
                        <DocsContent userDetails={userDetails} />
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}

export default Docs
