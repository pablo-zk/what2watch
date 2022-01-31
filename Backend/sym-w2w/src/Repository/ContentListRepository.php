<?php

namespace App\Repository;

use App\Entity\ContentList;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ContentList|null find($id, $lockMode = null, $lockVersion = null)
 * @method ContentList|null findOneBy(array $criteria, array $orderBy = null)
 * @method ContentList[]    findAll()
 * @method ContentList[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ContentListRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ContentList::class);
    }

    // /**
    //  * @return ContentList[] Returns an array of ContentList objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ContentList
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
