<?php

namespace App\Entity;

use App\Repository\KidRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=KidRepository::class)
 */
class Kid extends User
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
    private $state;

    public function __construct($username)
    {
        parent::__construct($username);
        $this->state = 1;
    }

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getState(): ?int
    {
        return 1;
    }

    public function setState(int $state): self
    {
        $this->state = $state;

        return $this;
    }
}
