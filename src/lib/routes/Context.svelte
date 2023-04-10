<script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../../firebase";
  export let location;
  export let id;
  async function getDocument() {
    const docRef = doc(db, "contexts", `${id}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  getDocument();
</script>

<div>
  <h1>Context {id}</h1>
  <p>Context content goes here</p>

  <!-- Go back to dashboard -->

  <a href="/dashboard">Go back to dashboard</a>
</div>

<style>
  /* your styles go here */
</style>
