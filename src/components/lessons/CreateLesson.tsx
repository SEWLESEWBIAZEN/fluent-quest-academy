import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAuth } from '@/contexts/AuthContext';
import axios from 'axios';
import { apiUrl } from '@/lib/envService';
import { toast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';

interface CreateLessonProps {
}

const CreateLesson: React.FC<CreateLessonProps> = () => {
    const { courseId } = useParams<{ courseId: string }>()

    const { user } = useAuth()
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [lessonDescription, setLessonDescription] = useState('');
    const [lessonThumbnail, setLessonThumbnail] = useState<File | null>(null);
    const [lessonDuration, setLessonDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [lessonType, setLessonType] = useState('select');
    const [lessonPoint, setLessonPoint] = useState(0);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('course_id', courseId);
        formData.append('description', lessonDescription);
        formData.append("type", lessonType)
        formData.append('thumbnail', lessonThumbnail);
        formData.append('duration', lessonDuration.toString());
        formData.append('point', lessonPoint.toString());

        try {
            const response = await axios.post(`${apiUrl}/lessons/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authToken': user?.accessToken ?? ""
                }
            })

            if (response?.data?.success) {
                toast({
                    title: "Success",
                    description: response?.data?.message ?? "Lesson created successfully!",
                    variant: "primary"
                })

                setIsDialogOpen(false);
            }
            else {
                toast({
                    title: "Error Occured",
                    description: response?.data?.message ?? "Failed to create lesson.",
                    variant: "destructive"
                })
            }
        }
        catch (error: any) {
            toast({
                title: error?.message || "Error Occured",
                description: error?.response?.data?.message || error?.message || "Failed to create lesson.",
                variant: "destructive"
            })
        }
        finally {
            setIsLoading(false);
        }

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild><Button>Add Lesson</Button></DialogTrigger>
            <DialogContent className='max-w-[400px] md:max-w-4xl' >
                <DialogTitle className="text-lg font-semibold">Add Lesson</DialogTitle>
                <DialogDescription className="text-sm text-gray-500">Fill in the details below to create a new lesson.</DialogDescription>
                <form className='flex flex-col space-y-8 p-4 rounded-md' onSubmit={handleSubmit}>
                    <div className='flex flex-col md:flex-row w-full gap-2'>
                        <div className='flex-1'>
                            <Label htmlFor="lessonTitle">
                                Lesson Title
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="text"
                                id="lessonTitle"
                                name="lessonTitle"
                                placeholder='Enter lesson title...'
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className=''>
                            <Label htmlFor="lessonType">
                                Lesson Type
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Select name="lessonType" required value={lessonType} onValueChange={setLessonType}>
                                <SelectTrigger className='flex justify-end mr-2'>
                                    <SelectValue placeholder={lessonType ?? "Select a lesson type"} />
                                </SelectTrigger>
                                <SelectContent defaultValue={lessonType}>
                                    <SelectItem value="select">---Select a lesson type---</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="article">Article</SelectItem>
                                    <SelectItem value="quiz">Quiz</SelectItem>
                                    {/* <SelectItem value="assignment">Assignment</SelectItem>
                                    <SelectItem value="discussion">Discussion</SelectItem>
                                    <SelectItem value="project">Project</SelectItem>
                                    <SelectItem value="other">Other</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="lessonDescription">
                            Lesson Description
                            <span className='text-red-500'>*</span>
                        </Label>
                        <Textarea id="lessonDescription"
                            name="lessonDescription"
                            placeholder='Enter lesson description...'
                            required
                            value={lessonDescription}
                            onChange={(e) => setLessonDescription(e.target.value)} />
                    </div>

                    <div className='flex flex-col md:flex-row w-full gap-2'>
                        <div className='flex-1'>
                            <Label htmlFor='lessonPoint'>
                                Lesson Point
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="text"
                                id="lessonPoint"
                                name="lessonPoint"
                                placeholder='Enter lesson Point...'
                                required
                                value={lessonPoint}
                                onChange={(e) => setLessonPoint(Number(e.target.value))} />
                        </div>
                        <div className='flex-1'>
                            <Label htmlFor='lessonDuration'>
                                Lesson Duration
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="text"
                                id="lessonDuration"
                                name="lessonDuration"
                                placeholder='Enter lesson duration...'
                                required
                                value={lessonDuration}
                                onChange={(e) => setLessonDuration(Number(e.target.value))} />
                        </div>


                        <div className='flex-1'>
                            <Label htmlFor="lessonImage">
                                Lesson Thumbnail
                                <span className='text-red-500'>*</span>
                            </Label>
                            <Input type="file"
                                id="lessonImage"
                                name="lessonImage"
                                accept="image/*"
                                onChange={(e) => setLessonThumbnail(e.target.files[0])} />
                        </div>
                    </div>


                    <div className='mt-4 flex justify-end'>
                        <Button type="submit" disabled={isLoading}>{isLoading ? "Creating..." : "Create Lesson"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLesson
