'use client';

import { useEffect } from 'react';

const SITE_NAME = "DIYA'S ORGANICS";

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | Ayurvedic-inspired hair care for stronger, thicker, healthier hair`;
  }, [title]);
}
