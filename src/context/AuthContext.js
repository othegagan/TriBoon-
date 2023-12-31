import React, { createContext, useContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth, db } from "../firebase";
import { query, getDocs, collection, where, addDoc, onSnapshot } from "firebase/firestore";

const UserContext = createContext();
export const UserAuth = () => {
    return useContext(UserContext);
};


export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userDetails] = useState();
    const [dbtickets,setdbtickets] = useState();
    const [usersData, setUsersData] = useState([]);
    const [arr] = useState([])
    const [statCount] = useState([])
    const [priorityCount] = useState([])
    const [typeCount] = useState([])
    const googleProvider = new GoogleAuthProvider();


    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(collection(db, "admin"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "admin"), {
                    uid: user.uid,
                    FullName: user.displayName,
                    authProvider: "google",
                    email: user.email,
                    role: "admin",
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const registerWithEmailAndPassword = async (firstName, lastName, email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = res.user;
            console.log("new signup ", res.user);
            await addDoc(collection(db, "admin"), {
                uid: user.uid,
                FirstName: firstName,
                LastName: lastName,
                authProvider: "local",
                email: email,
                role: "admin",
                password: password,
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };


    const logout = () => {
        return signOut(auth);
    };

    const roleCount = () => {
        const c = [arr.filter(x => x === "Developer").length, arr.filter(x => x === "Tester").length]
        return (c);

    }
    const statusCount = () => {
        const c = [statCount.filter(x => x === "To Do").length, statCount.filter(x => x === "In Progress").length, statCount.filter(x => x === "Done").length]
        return (c);
    }

    const pCount = () => {
        const c = [priorityCount.filter(x => x === "Low").length, priorityCount.filter(x => x === "Medium").length, priorityCount.filter(x => x === "High").length]
        return (c);
    }

    const tCount = () => {
        const c = [typeCount.filter(x => x === "Bug/Error").length, typeCount.filter(x => x === "Test Case").length]
        return (c);
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            onSnapshot(
                collection(db, "tickets"),
                (snapShot) => {
                    let list = [];
                    snapShot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                        // eslint-disable-next-line
                    });
                    setdbtickets(list);
                },
                (error) => {
                    console.log(error);
                }
            );
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const getUsers = onSnapshot(
            collection(db, "users"),
            (snapShot) => {
                let list = [];
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                    // eslint-disable-next-line
                    arr.push(doc.data().role);
                });
                setUsersData(list);
            },
            (error) => {
                console.log(error);
            }
        );

        const statusCount = onSnapshot(collection(db, "tickets",),
            (snapShot) => {
                snapShot.docs.forEach((doc) => {
                    statCount.push(doc.data().status);
                    priorityCount.push(doc.data().priority);
                    typeCount.push(doc.data().type);
                });
            },
            (error) => {
                console.log(error);
            }
        );


        return () => {
            getUsers();
            statusCount();
        };
    }, [arr,statCount, priorityCount]);



    // console.log(dbtickets)

    function formatedDate() {
        const months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "June",
            6: "July",
            7: "Aug",
            8: "Sept",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const d = new Date();
        const year = d.getFullYear();
        const date = d.getDate();
        const monthName = months[d.getMonth()];
        const dayName = days[d.getDay()];

        const formatted = `${dayName}, ${date} ${monthName} ${year}`;
        return formatted.toString();
    }

    return (
        <UserContext.Provider
            value={{ user, logout, signIn, formatedDate, usersData, signInWithGoogle, registerWithEmailAndPassword, roleCount,statusCount,pCount,tCount, userDetails, dbtickets }}
        >
            {children}
        </UserContext.Provider>
    );
};

