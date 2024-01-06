import GetAllFolders from "./Components/GetAllFolders";

const Home = () => {
    return (
        <div className="home">
            <h1>Megaman Chip Folder Builder</h1>
            <h2>Your Folders</h2>
            <GetAllFolders/>
        </div>
    );
}
 
export default Home;