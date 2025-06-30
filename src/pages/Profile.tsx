import React, { useState } from 'react';
import { User, Mail, Briefcase, GraduationCap, Plus, X, Linkedin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [skills, setSkills] = useState(['JavaScript', 'React', 'Python', 'Data Analysis']);
  const [newSkill, setNewSkill] = useState('');
  const [experience, setExperience] = useState([
    { title: 'Software Developer', company: 'Tech Corp', duration: '2022 - Present' },
    { title: 'Junior Developer', company: 'StartupXYZ', duration: '2020 - 2022' }
  ]);
  const [education, setEducation] = useState([
    { degree: 'Bachelor of Computer Science', school: 'University of Technology', year: '2020' }
  ]);

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleLinkedInImport = () => {
    // Simulate LinkedIn import
    alert('LinkedIn import feature coming soon! This will automatically populate your profile with data from your LinkedIn profile.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-blue-700 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user?.name || 'Professional'}</h1>
                <p className="text-primary-100">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* LinkedIn Import */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-3 mb-3">
                <Linkedin className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-secondary-900">Import from LinkedIn</h3>
              </div>
              <p className="text-secondary-600 mb-4">
                Quickly populate your profile by importing data from your LinkedIn profile.
              </p>
              <div className="flex space-x-3">
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  onClick={handleLinkedInImport}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Import
                </button>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-primary-600" />
                <span>Skills</span>
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                  >
                    <span>{skill}</span>
                    <button onClick={() => removeSkill(skill)} className="hover:text-primary-900">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-primary-600" />
                <span>Experience</span>
              </h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="border border-secondary-200 rounded-lg p-4">
                    <h3 className="font-semibold text-secondary-900">{exp.title}</h3>
                    <p className="text-primary-600">{exp.company}</p>
                    <p className="text-secondary-500 text-sm">{exp.duration}</p>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-secondary-300 rounded-lg p-4 text-secondary-500 hover:border-primary-400 hover:text-primary-600 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-primary-600" />
                <span>Education</span>
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="border border-secondary-200 rounded-lg p-4">
                    <h3 className="font-semibold text-secondary-900">{edu.degree}</h3>
                    <p className="text-primary-600">{edu.school}</p>
                    <p className="text-secondary-500 text-sm">{edu.year}</p>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-secondary-300 rounded-lg p-4 text-secondary-500 hover:border-primary-400 hover:text-primary-600 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;