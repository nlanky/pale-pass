// REACT
import type { FC } from "react";

// LOCAL FILES
// Redux
import { useAppSelector } from 'features/redux/hooks';
import { selectPlayerResources } from "features/town/townSlice";

export const Overview: FC<{}> = () => {
    // Hooks
    const resources = useAppSelector(selectPlayerResources);

    return (
        <>
            <h1>Pale Pass</h1>
            <p>{JSON.stringify(resources)}</p>
        </>
    );
};
