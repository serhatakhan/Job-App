import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = ( {getJobs} ) => {
  const jobState = useSelector((store) => store.jobReducer);

  return (
    <div className="list-page">
      <Filter />

      {/* 
      1) yüklenme devam ediyorsa ekrana loader bas.
      2) yüklenme bittiyse ve hata varsa, ekrana hatayı ve tekrar dene butonunu bas.
      3) yüklenme bittiyse ve hata yoksa, kartları ekrana bas.
      */}

      {jobState.isLoading ? (
        <Loader />
      ) : jobState.error ? (
        <Error text={jobState.error} getJobs={getJobs} />
      ) : (
        <div className="job-list">
          {jobState.jobs.map((job)=> (
              <Card key={job.id} job={job} />
            ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
