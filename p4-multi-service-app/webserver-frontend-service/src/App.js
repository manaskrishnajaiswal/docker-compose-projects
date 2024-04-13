import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const getUsersData = async () => {
      const { users, status } = await getUsers();
      if (status == 200 && users) {
        setUsersList(users);
      }
    };
    getUsersData();
  }, []);

  const addUserButton = async (name, age) => {
    console.log("name => ", name);
    console.log("age => ", age);
    if (name.length && age) {
      await axios
        .post("/api/user", {
          name: name,
          age: age,
        })
        .then(async function (response) {
          console.log(response);
          const { users, status } = await getUsers();
          if (status == 200 && users) {
            setUsersList(users);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    setName("");
    setAge("");
  };

  console.log("usersList => ", usersList);

  return (
    <div className="my-4 mx-4">
      <div className="flex flex-col space-y-4" style={{ width: "20rem" }}>
        <TextField
          required
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="outlined-basic"
          label="Age"
          type="number"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <Button onClick={() => addUserButton(name, age)} variant="contained">
          Add User
        </Button>
      </div>
      <div className="my-5 mx-5">
        <ul className="list-disc">
          {usersList.length > 0 ? (
            <>
              {usersList.map((user) => (
                <li key={user._id}>
                  {user.name}, {user.age}
                </li>
              ))}
            </>
          ) : (
            <h1>User List is Empty!!</h1>
          )}
        </ul>
      </div>
    </div>
  );
}

const getUsers = async () => {
  const { data, status } = await axios.get("/api/user");
  const { users } = data;
  console.log("users => ", users);
  return { users, status };
};

export default App;
