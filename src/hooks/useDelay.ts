"use client";

import { useEffect, useState } from "react";

export function useDelay(ms: number, deps: unknown[] = []) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(false);
        const t = setTimeout(() => setReady(true), ms);
        return () => clearTimeout(t)
    }, [ms, deps])

    return ready;
}