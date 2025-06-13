import { getAuth } from "firebase/auth";

const waitForAuth = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe(); 
      if (user) resolve(user);
      else reject(new Error("User not authenticated"));
    });
  });
};

const myArticlesLoader = async ({ params }) => {
  try {
    const user = await waitForAuth(); 
    const token = await user.getIdToken();
// fetch(`http://localhost:9000/myarticals/${params.id}`
    const res = await fetch(`http://localhost:9000/myarticles/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to load user articles");
    }

    return res.json();
  } catch (err) {
    console.error("Loader error:", err.message);
    throw err;
  }
};

export default myArticlesLoader;
