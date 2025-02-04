"use client";

import React from "react";
import { CheckCircle, Clock, Users, Zap, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

const LandingPage = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      title: "Task Organization",
      description:
        "Keep all your tasks organized in one place with intuitive categorization and priority settings.",
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "Time Tracking",
      description:
        "Monitor time spent on tasks and projects to optimize your productivity and workflow.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      title: "Team Collaboration",
      description:
        "Work seamlessly with your team, assign tasks, and track progress in real-time.",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: "Smart Automation",
      description:
        "Automate repetitive tasks and workflows to save time and reduce manual work.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" suppressHydrationWarning>
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">TaskFlow</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Testimonials
                </a>
                <button
                  onClick={() => redirect("/dashboard")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Manage tasks with</span>
                  <span className="block text-blue-600">
                    unprecedented ease
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Stay organized, focused, and in sync with your team. TaskFlow
                  helps you manage your tasks efficiently and boost
                  productivity.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => redirect("/dashboard")}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start Free Trial
                    </button>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                      Watch Demo
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage tasks effectively
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white border border-blue-100">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">
              Start your free trial today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => redirect("/dashboard")}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
