import React, { useEffect, useState } from "react";
import { ConnectButton } from "@mysten/dapp-kit";
import {
  Box,
  Container,
  Flex,
  Heading,
  Card,
  Text,
  Button,
} from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import { useCurrentAccount } from "@mysten/dapp-kit";
import Refer from "./Refer";
import { db } from "./firebase";
import "./index.css";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function App() {
  const account = useCurrentAccount();
  const address = account?.address;
  const [profiles, setProfiles] = useState([] as any[]);
  const [following, setFollowing] = useState<string[]>([]);
  const [userExists, setUserExists] = useState<boolean>(true);
  const [expandedProfiles, setExpandedProfiles] = useState<Set<number>>(new Set());

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");

  const fetchFollowing = async () => {
    const currentUserEmail = account?.label;
    if (!currentUserEmail) return;

    const profilesRef = collection(db, "profiles");
    const qCurrentUser = query(
      profilesRef,
      where("email", "==", currentUserEmail),
    );
    const currentUserSnapshot = await getDocs(qCurrentUser);

    if (!currentUserSnapshot.empty) {
      const currentUserData = currentUserSnapshot.docs[0].data();
      if (Array.isArray(currentUserData.following)) {
        setFollowing(currentUserData.following);
      }
    }
  };

  const handleFollow = async (profile: any) => {
    const currentUserEmail = account?.label; // Assuming you have a way to get the current user's email
    const profilesRef = collection(db, "profiles");

    // Query to find the profile to follow/unfollow
    const qFollowed = query(profilesRef, where("email", "==", profile.email));
    const followedSnapshot = await getDocs(qFollowed);

    // Query to find the current user's profile
    const qCurrentUser = query(
      profilesRef,
      where("email", "==", currentUserEmail),
    );
    const currentUserSnapshot = await getDocs(qCurrentUser);

    if (!followedSnapshot.empty && !currentUserSnapshot.empty) {
      const followedDoc = followedSnapshot.docs[0];
      const currentUserDoc = currentUserSnapshot.docs[0];
      const followedData = followedDoc.data();
      const currentUserData = currentUserDoc.data();

      // Update followers list for the followed profile
      let followers = followedData.followers || [];
      let following = currentUserData.following || [];

      if (!followers.includes(currentUserEmail)) {
        followers.push(currentUserEmail);
        following.push(profile.email);
      } else {
        followers = followers.filter(
          (email: string) => email !== currentUserEmail,
        );
        following = following.filter(
          (email: string) => email !== profile.email,
        );
      }

      // Update both documents
      const followedDocRef = doc(profilesRef, followedDoc.id);
      const currentUserDocRef = doc(profilesRef, currentUserDoc.id);

      await updateDoc(followedDocRef, { followers });
      await updateDoc(currentUserDocRef, { following });

      setFollowing(following);
    } else {
      if (followedSnapshot.empty) {
        console.log(`Profile with email ${profile.email} not found`);
      }
      if (currentUserSnapshot.empty) {
        console.log(
          `Current user's profile with email ${currentUserEmail} not found`,
        );
      }
    }
  };

  const updateDatabase = async () => {
    const email = account?.label;
    const profilesRef = collection(db, "profiles");
    // get all profiles and set them to state
    const profilesSnapshot = await getDocs(profilesRef);
    const p = profilesSnapshot.docs.map((doc) => doc.data());
    setProfiles(p);

    const q = query(profilesRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // No document with the email exists
      setUserExists(false);
    } else {
      console.log("Document already exists with email:", email);
    }
  };

  const handleSubmit = async () => {
    const email = account?.label;
    const profilesRef = collection(db, "profiles");

    await addDoc(profilesRef, {
      email,
      address,
      firstName,
      lastName,
      university,
      bio,
      location,
    });
    console.log("Document added with email:", email);
    setUserExists(true);
  };

  const toggleProfileExpand = (index: number) => {
    setExpandedProfiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (account) {
      updateDatabase();
      fetchFollowing();
    }
  }, [account]);

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>$yndeo</Heading>
        </Box>

        <Box>
          <ConnectButton />
        </Box>
      </Flex>
      <Container>
        <Container
          mt="5"
          pt="2"
          px="4"
          style={{ background: "var(--gray-a2)", minHeight: 500 }}
        >
          <WalletStatus />
          {account && (
            <div>
              {!userExists && (
                <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Create Your Profile</h2>
                  <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">University</label>
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Short Bio</label>
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                      type="text"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleSubmit} className="mt-4">
                    Submit
                  </Button>
                </div>
              )}
              <Refer referrerEmail={account?.label} />
              {userExists && (
                <div>
              <Heading>Find others on $yndeo!</Heading>
              <Box mt="4">
                {profiles.map((profile, index) => (
                  <Card
                    key={index}
                    mb="4"
                    style={{
                      background: "var(--gray-a5)",
                    }}
                    onClick={() => toggleProfileExpand(index)}
                    className="cursor-pointer"
                  >
                    <Flex>
                      <div className="pe-5">
                        <Text>{profile.firstName ? `${profile.firstName} ${profile.lastName}` : profile.email}</Text>
                      </div>
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        handleFollow(profile);
                      }}>
                        {following.includes(profile.email)
                          ? "Unfollow"
                          : "Follow"}
                      </Button>
                    </Flex>
                    {expandedProfiles.has(index) && (
                     <div className="mt-4">
                     {profile.email && <p><strong>Email:</strong> {profile.email}</p>}
                     {profile.university && <p><strong>University:</strong> {profile.university}</p>}
                     {profile.bio && <p><strong>Bio:</strong> {profile.bio}</p>}
                     {profile.location && <p><strong>Location:</strong> {profile.location}</p>}
                   </div>
                    )}
                  </Card>
                ))}
              </Box>
              </div>
              )}
            </div>
          )}
        </Container>
      </Container>
    </>
  );
}

export default App;
