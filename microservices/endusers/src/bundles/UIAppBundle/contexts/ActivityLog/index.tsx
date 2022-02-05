import React, { createContext, useContext, useState } from "react";
import { ActivityLog } from "src/api.types";

export const ActivityLogContext = createContext<[ActivityLog, React.Dispatch<React.SetStateAction<ActivityLog>>]>(null as any)

export const ActivityLogProvider: React.FC = ({children}) => {
    const [activityLog, setActivityLog] = useState<ActivityLog>()

    return (
        <ActivityLogContext.Provider value={[activityLog as any, setActivityLog as any]}>
            {children}
        </ActivityLogContext.Provider>
    )
}


export const useActivityLog = () => useContext(ActivityLogContext)
