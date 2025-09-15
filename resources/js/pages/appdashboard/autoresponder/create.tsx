import React from 'react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function PushAutoresponderProModal() {
  return (
    <DialogContent className=" bg-white p-0">
      <div className="flex flex-col md:flex-row gap-8 p-8 ">
        {/* Left: Features List */}
        <div className="flex-1 md:flex-[1.2] min-w-[460px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-2">Push Autoresponder is a Pro feature</DialogTitle>
            <div className="font-semibold mb-4 text-gray-800">Key benefits of Push Autoresponder:</div>
          </DialogHeader>
          <ul className="space-y-3 text-gray-700 text-base">
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✔️</span> Automatically send push notifications after user subscribes</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✔️</span> Schedule messages with flexible delays (e.g., after 1 hour or 30 minutes)</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✔️</span> Send messages immediately or at a specific time (HH:MM format)</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✔️</span> Create multi-step autoresponder sequences (drip notifications)</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✔️</span> Add multiple follow-up notifications to engage users over time</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✔️</span> Target all subscribers or filter by segments, location, or device and OR/AND conditions</li>
            <li className="flex items-start gap-2"><span className="text-blue-600 mt-1">✔️</span> Track sent, viewed, and clicked metrics in real-time</li>
          </ul>
          <Button className="mt-8 w-40 bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2" asChild={false}>
            Upgrade Now
          </Button>
          <a href="#" className="block mt-4 text-blue-600 text-sm hover:underline text-center">Explore Features →</a>
        </div>
        {/* Right: Video */}
        {/* <div className="md:flex-[0.8] flex items-center justify-center">
          <div className="w-[320px] max-w-full aspect-video rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/1QZLr0yqQ2w"
              title="Smart A/B Testing for Push Notification - alertwise.net"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div> */}
      </div>
    </DialogContent>
  );
}
