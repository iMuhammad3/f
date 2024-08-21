import { useQuery } from "@tanstack/react-query";

const fetchScores = async () => {
    try {
        const res = await fetch("/api/scores");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
            throw new Error(data.error || "Something went wrong");
        }
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const useScores = () => {
    return useQuery({
        queryKey: ['scores'],
        queryFn: fetchScores,
      });
};

export default useScores;