import { useEffect, useState } from 'react';

interface VideoStatus {
  isReady: boolean;
  hasError: boolean;
}

// Structurally compatible with both expo-video's VideoPlayer (native) and
// VideoPlayer.web.tsx's WebVideoPlayer (web/Electron) — only the subset this
// hook actually touches.
interface StatusEmittingPlayer {
  status: string;
  addListener(event: 'statusChange', callback: (event: { status: string }) => void): { remove: () => void };
}

// Tracks a video player's real readiness/error state (via its statusChange
// event) so screens can show a loading spinner or an error message instead
// of a blank/black video frame while the video decodes or if it fails.
export function useVideoStatus(player: StatusEmittingPlayer): VideoStatus {
  const [status, setStatus] = useState<VideoStatus>({
    isReady: player.status === 'readyToPlay',
    hasError: player.status === 'error',
  });

  useEffect(() => {
    const subscription = player.addListener('statusChange', ({ status: newStatus }) => {
      setStatus({
        isReady: newStatus === 'readyToPlay',
        hasError: newStatus === 'error',
      });
    });
    return () => subscription.remove();
  }, [player]);

  return status;
}
