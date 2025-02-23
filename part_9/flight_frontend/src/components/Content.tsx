import { DiaryEntry } from "../types/types";
const Content = ({ entries }: { entries: DiaryEntry[] }) => {
    return (
        <div>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <h3>{entry.date}</h3>
                    <p>{entry.weather}</p>
                    <p>{entry.visibility}</p>
                    <p>{entry.comment}</p>
                </div>
            ))}
        </div>
    )
};

export default Content;