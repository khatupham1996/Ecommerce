import { useState, useEffect } from "react";

const API = "https://provinces.open-api.vn/api/v1";

export function useProvinces() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch provinces on mount
  useEffect(() => {
    fetch(`${API}/`)
      .then((r) => r.json())
      .then(setProvinces)
      .catch(console.error);
  }, []);

  // Fetch districts when province changes
  const fetchDistricts = async (provinceCode) => {
    if (!provinceCode) {
      setDistricts([]);
      setWards([]);
      return;
    }
    setLoading(true);
    const res = await fetch(`${API}/p/${provinceCode}?depth=2`);
    const data = await res.json();
    setDistricts(data.districts || []);
    setWards([]);
    setLoading(false);
  };

  // Fetch wards when district changes
  const fetchWards = async (districtCode) => {
    if (!districtCode) {
      setWards([]);
      return;
    }
    setLoading(true);
    const res = await fetch(`${API}/d/${districtCode}?depth=2`);
    const data = await res.json();
    setWards(data.wards || []);
    setLoading(false);
  };

  return { provinces, districts, wards, loading, fetchDistricts, fetchWards };
}
