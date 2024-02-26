import { useState } from "react";
import { api } from "~/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"


export default function Home() {
  //define constants
  const [rollno, setRollno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gpa, setGpa] = useState("");
  const [rollnoToUpdate, setRollnoToUpdate] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [departmentToUpdate, setDepartmentToUpdate] = useState("");
  const [dateOfBirthToUpdate, setDateOfBirthToUpdate] = useState("");
  const [gpaToUpdate, setGpaToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");

  //define functions
  const fetchAllUsers = api.example.getAll.useQuery();
  const fetchOneUser = api.example.getOne.useQuery({ id: userId });

  const createUserMutation = api.example.createUser.useMutation();
  const updateUserMutation = api.example.updateUser.useMutation();
  const deleteUserMutation = api.example.deleteUser.useMutation();

  //define handlers
  const handleCreateUser = async () => {
    try {
      const parsedDate = new Date(dateOfBirth);
      await createUserMutation.mutateAsync({
        rollno: BigInt(rollno),
        name: name,
        email: email,
        department: department,
        dateOfBirth: parsedDate,
        gpa: parseInt(gpa),
      });
      setRollno("");
      setName("");
      setEmail("");
      setDepartment("");
      setDateOfBirth("");
      setGpa("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
        rollno: BigInt(rollnoToUpdate),
        department: "",
        dateOfBirth: new Date(dateOfBirthToUpdate),
        gpa: parseInt(gpaToUpdate),
      });
      setRollnoToUpdate("");
      setNameToUpdate("");
      setEmailToUpdate("");
      setDepartmentToUpdate("");
      setDateOfBirthToUpdate("");
      setGpaToUpdate("");
      setUserIdToUpdate("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({
        id: userIdToDelete,
      });
      setUserIdToDelete("");
      fetchAllUsers.refetch();
    } catch (error) {
      console.log(error);
    }
  };

  //return an empty div
  return (
    <div className="mx-auto">
      {/* <div className="mb-8"> */}
      <h2 className="mb-8 text-4xl font-bold w-full text-center rounded bg-violet-500 px-5 py-5">Employee Database Management</h2>
      {/*</div>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => fetchAllUsers.refetch()}
      >
        Get All Users
      </button> */}

      <div className="text- mb-4 mt-4 mx-8 grid grid-cols-7 gap-4 font-bold">
        <p>Id</p>
        <p>Employee ID</p>
        <p>Employee Name</p>
        <p>Gender</p>
        <p>Department</p>
        <p>Date of Birth</p>
        <p>Salary</p>
      </div>

      {fetchAllUsers.data &&
        fetchAllUsers.data.map((user) => (
          <div
            key={user.id}
            className="my-4 grid grid-cols-7 gap-4 rounded border border-gray-300 bg-white p-4 shadow mx-4"
          >
            <p>{user.id}</p>
            <p>{user.rollno.toString()}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.department}</p>
            <p>{user.dateOfBirth.toLocaleDateString()}</p>
            <p>{user.gpa}</p>
          </div>
        ))}

      {/* Get one user UI */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold ">Get One User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user id to get"
            value={userId || ""}
            onChange={(e) => setUserId(String(e.target.value))}
          />
          <button
            className="rounded px-4 py-2 border-2 border-black text-white hover:bg-violet-500"
            onClick={() => fetchOneUser.refetch()}
          >
            Search
          </button>
        </div>
        {fetchOneUser.data && (
          <div>
            <p>Employee ID No: {fetchOneUser.data.rollno.toString()}</p>
            <p>Employee Name: {fetchOneUser.data.name}</p>
            <p>Gender: {fetchOneUser.data.email}</p>
            <p>Department: {fetchOneUser.data.department}</p>
            <p>Date of Birth: {fetchOneUser.data.dateOfBirth.toLocaleDateString()}</p>
            <p>Salary: {fetchOneUser.data.gpa}</p>
          </div>
        )}
      </div>

      {/* Create User */}
      <div className="mb-8 px-5">
        <h2 className="mb-4 text-2xl font-bold">Create New User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Employee ID"
            value={rollno}
            onChange={(e) => setRollno(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Gender"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Salary"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
        </div>

        <button
          className="rounded px-4 py-2 border-2 border-black text-white hover:bg-violet-500"
          onClick={handleCreateUser}
        >
          Create User
        </button>
      </div>

      {/* Update User */}

      <div className="mb-8 px-5 py-5">
        <h2 className="mb-4 text-2xl font-bold">Update User</h2>
        <input
          placeholder="Enter ID to update"
          className="mr-2 border border-gray-300 p-2 mb-5 rounded-md"
          value={userIdToUpdate}
          onChange={(e) => setUserIdToUpdate(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
        <div className="mb-4 flex">          
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
          placeholder="Employee ID to update"
            value={rollnoToUpdate}
            onChange={(e) => setRollnoToUpdate(e.target.value)}
          />
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Employee Name to update"
            value={nameToUpdate}
            onChange={(e) => setNameToUpdate(e.target.value)}
          />
        </div>
        <div className="mb-4 flex">          
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
          placeholder="Gender to update"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(e.target.value)}
          />
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Department to update"
            value={departmentToUpdate}
            onChange={(e) => setDepartmentToUpdate(e.target.value)}
          />
        </div>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Date of Birth to update"
            type="date"
            value={dateOfBirthToUpdate}
            onChange={(e) => setDateOfBirthToUpdate(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2 rounded-md"
            placeholder="Salary to update"
            value={gpaToUpdate}
            onChange={(e) => setGpaToUpdate(e.target.value)}
          />
        </div>
      </div>

      {/* Delete User */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
        <input
          placeholder="Enter ID to delete"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToDelete}
          onChange={(e) => setUserIdToDelete(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleDeleteUser}
        >
          Delete User
        </button>
      </div>

    </div>
  );
}
