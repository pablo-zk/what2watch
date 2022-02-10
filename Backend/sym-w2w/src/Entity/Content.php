<?php

namespace App\Entity;

use App\Repository\ContentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ContentRepository::class)
 */
class Content
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $idContent;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $cover;

    /**
     * @ORM\ManyToMany(targetEntity=ContentList::class, mappedBy="content")
     */
    private $contentLists;


    public function __construct()
    {
        $this->contentlist = new ArrayCollection();
        $this->contentLists = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdContent(): ?int
    {
        return $this->idContent;
    }

    public function setIdContent(int $idContent): self
    {
        $this->idContent = $idContent;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCover(): ?string
    {
        return $this->cover;
    }

    public function setCover(string $cover): self
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * @return Collection|ContentList[]
     */
    public function getContentLists(): Collection
    {
        return $this->contentLists;
    }

    public function addContentList(ContentList $contentList): self
    {
        if (!$this->contentLists->contains($contentList)) {
            $this->contentLists[] = $contentList;
            $contentList->addContent($this);
        }

        return $this;
    }

    public function removeContentList(ContentList $contentList): self
    {
        if ($this->contentLists->removeElement($contentList)) {
            $contentList->removeContent($this);
        }

        return $this;
    }


}
