import { DataContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import SubmissionTable from "../components/SubmissionTable/Table";
import WaintingToLoad from "../components/WaintingToLoad";
import { getUserSubmissions } from "../services/tocodeApi";

export default function Dashboard() {
  const { userData } = useContext(DataContext);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardContent() {
      let submissionList;
      try {
        submissionList = await getUserSubmissions(userData.id);
      } catch (err) {
        console.error(err);
      }
      setTableData(submissionList);
    }

    fetchDashboardContent().then(setIsLoading(false));
  }, []);

  if (isLoading) {
    return <WaintingToLoad />;
  }
  return (
    <div className=" m-auto flex h-full w-full flex-col items-center">
      <div className=" flex w-4/6 flex-row">
        <div className=" w-full">
          <p className=" m-5 text-4xl font-medium text-gray-700">
            ¡Hola, {userData?.firstname}!
          </p>
          <p className=" m-5 text-xl font-medium text-gray-700">
            Tus últimas ejecuciones :
          </p>
        </div>
      </div>
      <div className=" w-5/6 self-center">
        <SubmissionTable data={tableData} rowsPerPage={10} />
      </div>
    </div>
  );
}
