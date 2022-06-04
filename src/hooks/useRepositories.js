import {useEffect, useState} from "react";
import {REQUEST_STATUS} from "../lib/const/requestStatus";
import {getRepositories} from "../lib/gh/utils";

export default function useRepositories() {
    const [repositories, setRepositories] = useState();
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            try {
                const repositories = await getRepositories();
                setRepositories(repositories.data);
                setRequestStatus(REQUEST_STATUS.SUCCESS);

            } catch (e) {
                console.log(e);
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }

        getData();
    }, []);

    return {
        repositories,
        requestStatus,
        error
    };
}
