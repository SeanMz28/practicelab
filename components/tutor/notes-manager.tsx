"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Pencil, Trash2, FileText, Download } from "lucide-react"
import type { Note } from "@/lib/dummy-data"
import { MarkdownRenderer } from "@/components/notes/markdown-renderer"

interface NotesManagerProps {
  courseId: string
}

export function NotesManager({ courseId }: NotesManagerProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  })
  const [previewMode, setPreviewMode] = useState<"edit" | "preview">("edit")

  useEffect(() => {
    loadNotes()
  }, [courseId])

  const loadNotes = () => {
    const stored = JSON.parse(localStorage.getItem("notes") || "[]")
    setNotes(stored.filter((n: Note) => n.courseId === courseId))
  }

  const saveNotes = (updatedNotes: Note[]) => {
    const allNotes = JSON.parse(localStorage.getItem("notes") || "[]")
    const otherNotes = allNotes.filter((n: Note) => n.courseId !== courseId)
    localStorage.setItem("notes", JSON.stringify([...otherNotes, ...updatedNotes]))
    setNotes(updatedNotes)
  }

  const handleCreate = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      courseId,
      ...formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveNotes([...notes, newNote])
    setIsCreateOpen(false)
    resetForm()
  }

  const handleUpdate = () => {
    if (!editingNote) return

    const updated = notes.map((n) =>
      n.id === editingNote.id ? { ...editingNote, ...formData, updatedAt: new Date().toISOString() } : n,
    )
    saveNotes(updated)
    setEditingNote(null)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      saveNotes(notes.filter((n) => n.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ title: "", content: "" })
    setPreviewMode("edit")
  }

  const openEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
    })
  }

  const downloadAsPdf = async (note: Note) => {
    // Create a printable HTML page
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${note.title}</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              line-height: 1.6;
            }
            h1, h2, h3 { color: #1e40af; margin-top: 24px; }
            h1 { font-size: 32px; border-bottom: 2px solid #1e40af; padding-bottom: 8px; }
            h2 { font-size: 24px; }
            h3 { font-size: 20px; }
            code {
              background: #f3f4f6;
              padding: 2px 6px;
              border-radius: 4px;
              font-family: monospace;
            }
            pre {
              background: #1e293b;
              color: #e2e8f0;
              padding: 16px;
              border-radius: 8px;
              overflow-x: auto;
            }
            pre code {
              background: none;
              padding: 0;
              color: inherit;
            }
            @media print {
              body { margin: 0; padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div id="content"></div>
          <script type="module">
            import { marked } from 'https://cdn.jsdelivr.net/npm/marked@11.1.1/+esm';
            const content = ${JSON.stringify(note.content)};
            document.getElementById('content').innerHTML = marked.parse(content);
            setTimeout(() => {
              window.print();
              window.close();
            }, 500);
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Notes</h2>
          <p className="text-muted-foreground">Create and manage course notes with markdown</p>
        </div>
        <Dialog
          open={isCreateOpen || !!editingNote}
          onOpenChange={(open) => {
            setIsCreateOpen(open)
            if (!open) {
              setEditingNote(null)
              resetForm()
            }
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNote ? "Edit Note" : "Create New Note"}</DialogTitle>
              <DialogDescription>Write your notes using markdown formatting</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="note-title">Note Title</Label>
                <Input
                  id="note-title"
                  placeholder="e.g., Variables and Data Types"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <Tabs value={previewMode} onValueChange={(v: any) => setPreviewMode(v)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-xs">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="edit" className="mt-4">
                  <div>
                    <Label htmlFor="note-content">Content (Markdown)</Label>
                    <Textarea
                      id="note-content"
                      placeholder="# Heading

## Subheading

Write your content here using markdown...

\`\`\`python
# Code example
def hello():
    print('Hello, World!')
\`\`\`"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="min-h-[400px] font-mono"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports markdown formatting: headings, lists, code blocks, bold, italic, and more
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <div className="border rounded-lg p-6 min-h-[400px] bg-muted/30">
                    {formData.content ? (
                      <MarkdownRenderer content={formData.content} />
                    ) : (
                      <p className="text-muted-foreground text-center py-12">No content to preview</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={editingNote ? handleUpdate : handleCreate} className="w-full">
                {editingNote ? "Save Changes" : "Create Note"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {notes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
              <p className="text-muted-foreground">Create your first note to get started</p>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{note.title}</CardTitle>
                    <CardDescription className="mt-1">
                      Last updated {new Date(note.updatedAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => downloadAsPdf(note)} title="Download as PDF">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => openEdit(note)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(note.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground line-clamp-2">{note.content.substring(0, 150)}...</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
