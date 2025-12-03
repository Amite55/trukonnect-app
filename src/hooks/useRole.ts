import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useRole = () => {
  const [role, setRole] = useState<string | null>("");

  useEffect(() => {
    const getRole = async () => {
      try {
        const value = await AsyncStorage.getItem("role");
        // const newRole = value ? JSON.parse(value) : null;
        setRole(value);
      } catch (error) {
        console.error("Failed to load roll from AsyncStorage:", error);
      }
    };

    getRole();
  }, []);

  return role;
};
